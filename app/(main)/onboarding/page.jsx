import { industries } from '@/data/industries'

import OnBoardingForm from './_componenets/onboarding-form'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'


const OnboardingPage = async() => {

    const {isOnboarded}=await getUserOnboardingStatus()

    if(isOnboarded) redirect('/dashboard')
  return (
    <main>
        <OnBoardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage