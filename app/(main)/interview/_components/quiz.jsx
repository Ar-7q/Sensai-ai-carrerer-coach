'use client'

import { generateQuiz, saveQuizResult } from "@/actions/interview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { set } from "zod";
import QuizResult from "./quiz-result";


const { useState, useEffect } = require("react")

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([])

    const [showExplanation, setShowExplanation] = useState(false);


    const {
        loading: generatingQuiz,
        fn: generatingQuizFn,
        data: quizData,

    } = useFetch(generateQuiz)

    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data:resultData,
        setData:setResultData,
    }=useFetch(saveQuizResult)

    console.log('result data',resultData)

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null))
        }
    }, [quizData])

    const handleAnswer=(ans)=>{
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = ans
        setAnswers(newAnswers)
    }

    const handleNext=()=>{
        if(currentQuestion < quizData.length - 1) {

            setCurrentQuestion(currentQuestion + 1)
            setShowExplanation(false)
        }else {
            finishQuiz()
        }
    }

    const calculateScore=()=>{

        let correct=0;
        answers.forEach((answer, index) => {

            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        })

        return (correct / quizData.length) * 100;
    }

    const finishQuiz = async () => {

        const score=calculateScore();
        try {
            

            await saveQuizResultFn(quizData, answers, score)
            toast.success("Quiz Completed Eureka!")
        } catch (error) {
            toast.error(error.message || "Failed to save quiz result")
            
        }


    }

    const startNewQuiz=()=>{
        setCurrentQuestion(0)
        setAnswers([])
        setShowExplanation(false)
        generatingQuizFn()
        setResultData(null)
        toast.success("New Quiz Started")
    }

    if (generatingQuiz) {
        return <BarLoader className="mt-4" width={'100%'} color="gray" />
    }


    if(resultData) {
        return(
            <div className="mx-2">
                <QuizResult  result ={resultData} onStartNew={startNewQuiz} />
            </div>
        )
    }

    if (!quizData) {

        return (

            <Card className='mx-2'>
                <CardHeader>

                    <CardTitle>
                        Ready to Test Your Knowledge?
                    </CardTitle>

                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions designed to assess your understanding of key concepts in your industry.
                        <br />Take your time to read each question carefully and select the best answer.
                    </p>
                </CardContent>

                <CardFooter>
                    <Button className='w-full' onClick={generatingQuizFn}>
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        )



    }

    const question = quizData[currentQuestion]
    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-lg font-medium">{question.question}</p>
                <RadioGroup
                    onValueChange={handleAnswer}
                    value={answers[currentQuestion]}
                    className="space-y-2"
                >
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>

                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium">Explanation:</p>
                        <p className="text-muted-foreground">{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                {!showExplanation && (
                    <Button
                        onClick={() => setShowExplanation(true)}
                        variant="outline"
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}
                <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion] || savingResult}
                    className="ml-auto"
                >
                    {savingResult && (
                        <Loader2 className="mt-4" width={"100%"} color="gray" />
                    )}
                    {currentQuestion < quizData.length - 1
                        ? "Next Question"
                        : "Finish Quiz"}
                </Button>
            </CardFooter>
        </Card>

    )
}

export default Quiz