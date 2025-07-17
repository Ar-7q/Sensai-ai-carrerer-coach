"use client";
import { onboardingSchema } from '@/app/lib/schema';
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { updateUser } from '@/actions/user';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';


const OnBoardingForm = ({ industries }) => {
    const router = useRouter();

    const [selectedIndustry, setSelectedIndustry] = useState(null);



    const {

        loading: updateLoading,
        fn: updateUserFn,
        data: updateResult,
    } = useFetch(updateUser)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,

    } = useForm({
        resolver: zodResolver(onboardingSchema)
    })

    const onSubmit = async (values) => {

        try {


            const formattedIndustry = `${values.industry}-${values.subIndustry
                .toLowerCase()
                .replace(/ /g, '-')
                }`

            await updateUserFn({
                ...values,
                industry: formattedIndustry,
            })
        } catch (error) {
            console.error('Onboarding Error', error)

        }

    }


    useEffect(() => {
        if (updateResult?.success && !updateLoading) {
            toast.success('Profile Completed successful')
            router.push('/dashboard')
            router.refresh()
        }
    }, [updateResult, updateLoading])

    const watchIndustry = watch('industry');
    return (
        <div>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Complete Your Profile
                    </CardTitle>
                    <CardDescription>
                        Select your industry to get personalized insights and recommendations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)} >

                        <div className='space-y-2'>

                            <Label htmlFor='industry' >Industry</Label>

                            <Select
                                onValueChange={(value) => {
                                    setValue('industry', value)
                                    setSelectedIndustry(
                                        industries.find((ind) => ind.id === value)
                                    )
                                    setValue('subIndustry', '')
                                }}
                            >
                                <SelectTrigger id='industry'>
                                    <SelectValue placeholder='Select an industry' />
                                </SelectTrigger>

                                <SelectContent>
                                    {industries.map((ind) => {
                                        return (
                                            <SelectItem value={ind.id} key={ind.id}>
                                                {ind.name}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.industry && (
                                <p className='text-sm text-red-500'>
                                    {errors.industry.message}
                                </p>
                            )}
                        </div>

                        {
                            watchIndustry && (

                                <div className='space-y-2'>

                                    <Label htmlFor='subIndustry' >Specializiations</Label>

                                    <Select
                                        onValueChange={(value) => {
                                            setValue('subIndustry', value)

                                        }}
                                    >
                                        <SelectTrigger id='subIndustry'>
                                            <SelectValue placeholder='Select an industry' />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {selectedIndustry?.subIndustries.map((ind) => {
                                                return (
                                                    <SelectItem value={ind} key={ind}>
                                                        {ind}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>

                                    {errors.subIndustry && (
                                        <p className='text-sm text-red-500'>
                                            {errors.subIndustry.message}
                                        </p>
                                    )}
                                </div>


                            )
                        }

                        <div className='space-y-2'>

                            <Label htmlFor='experience' >Years Of Experience</Label>
                            <Input

                                id='experience'
                                type='number'
                                min='0'
                                max='50'
                                placeholder='Enter your years of experience'
                                {...register('experience')}

                            />


                            {errors.experience && (
                                <p className='text-sm text-red-500'>
                                    {errors.experience.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>

                            <Label htmlFor='skills' >Professional Skills</Label>
                            <Input

                                id='skills'

                                placeholder='eg. Python Javascript, React'
                                {...register('skills')}

                            />
                            <p className='text-sm text-gray-500'>
                                Separate Multiple Skills with Commas
                            </p>


                            {errors.skills && (
                                <p className='text-sm text-red-500'>
                                    {errors.skills.message}
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>

                            <Label htmlFor='bio' >Professional BioData</Label>
                            <Textarea

                                id='bio'

                                placeholder='Tell us about yourself...'
                                className='h-32'
                                {...register('bio')}

                            />



                            {errors.bio && (
                                <p className='text-sm text-red-500'>
                                    {errors.bio.message}
                                </p>
                            )}
                        </div>

                        <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white text-lg font-semibold' disabled={updateLoading}>
                            {updateLoading ? (
                                <>

                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />

                                    Saving...
                                </>
                            ) : (
                                'Submit Profile'
                            )}


                        </Button>


                    </form>
                </CardContent>
            </Card>

        </div>


    )
}

export default OnBoardingForm