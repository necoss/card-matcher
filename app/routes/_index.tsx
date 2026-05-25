import {
  CalculatorModesSection,
  CTASection,
  FAQPreviewSection,
  HeroSection,
  HowItWorksSection,
  UseCasesSection,
  WhyCardMatcherSection,
} from '@features/home'

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <CalculatorModesSection />
      <WhyCardMatcherSection />
      <UseCasesSection />
      <FAQPreviewSection />
      <CTASection />
    </>
  )
}
