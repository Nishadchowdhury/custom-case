/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/custom/Icons";
import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import Phone from "@/components/custom/Phone";
import Reviews from "@/components/custom/Reviews";
import { Check, Star } from "lucide-react";
import ItemsOptions from "../components/custom/ItemsOptionsDrawer";
import MaintenanceModal from "../components/custom/MaintenanceModal";
import { TextMorphUI } from "../components/ui/text-morph";
import Card from "../components/custom/Card";
import ReviewSliderModal from "../components/custom/ReviewSliderModal";

export default function Home() {

  return (

    <div>

      {/*  */}
      <MaintenanceModal />

      <section>
        <MaxWidthWrapper
          className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 bg-slate-50 dark:bg-secondary"
        >




          <div className="col-span-2 px-6 lg:px-0 lg:pt-4  ">

            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <img src="/snake-1.png" className="w-full" alt="" />
              </div>

              <h1
                className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-dynamic-white text-5xl md:text-6xl lg:text-7xl"
              >
                Your Image on a <span className="bg-green-600 text-white px-2  ">Custom</span> <span> </span>
                <br className="block sm:hidden" />
                <TextMorphUI

                  texts={['Phone case', "ATM card"]}
                />
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,

                <span className="font-semibold" >one-of-one </span> phone case.

                CaseCobra allows you to protect your memories, not just your phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start ">
                <div className="space-y-2 " >

                  <li className="flex gap-1.5 items-center text-left" >
                    <Check className="size-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left" >
                    <Check className="size-5 shrink-0 text-green-600" />
                    5 Years print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left" >
                    <Check className="size-5 shrink-0 text-green-600" />
                    Modern Iphone models supported
                  </li>

                </div>
              </ul>

              <div
                className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5 "
              >

                <div className="flex -space-x-4">
                  <img
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-1.png"
                    alt="user img"
                  />
                  <img
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-2.png"
                    alt="user img"
                  />
                  <img
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-3.png"
                    alt="user img"
                  />
                  <img
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-4.jpg"
                    alt="user img"
                  />
                  <img
                    className="inline-block size-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-5.jpg"
                    alt="user img"
                  />
                </div>

                <div
                  className="flex flex-col justify-between items-center sm:items-start"
                >
                  <div className="flex gap-0.5">
                    <Star className="size-4 text-green-600 fill-green-600" />
                    <Star className="size-4 text-green-600 fill-green-600" />
                    <Star className="size-4 text-green-600 fill-green-600" />
                    <Star className="size-4 text-green-600 fill-green-600" />
                    <Star className="size-4 text-green-600 fill-green-600" />
                  </div>

                  <p><span className="font-semibold">1,260</span> happy customers</p>

                </div>
              </div>

            </div>
          </div>



          {/* right side */}

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit ">

            <div className="relative ">

              <img src="/your-image.png" alt="" className=" dark:invert absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block" />

              <img src="/line.png" className=" dark:invert absolute w-20 -left-6 -bottom-6 select-none" alt="" />

              <Phone
                className="w-64 dark:bg-secondary"
                imgSrc="./testimonials/1.jpg"
              />


            </div>

          </div>

        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 dark:bg-slate-950 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32" >
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">

            <h2
              className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-dynamic-white "
            >
              What our
              <span className="relative px-2 text-green-600" >
                customers <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
              </span>
              say
            </h2>

            <img src="/snake-2.png" alt="" className="w-24 order-0 lg:order-2" />
          </div>



          <ReviewSliderModal />



        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>

      </section>


      {/* _______________________________________________footer________________________________________________ */}
      <section >
        <MaxWidthWrapper className="py-24 text-dynamic-white">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center ">

              <h2
                className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-4xl sm:text-5xl md:text-6xl  "
              >
                Upload your photo and get <span className="relative px-2 mx-2 bg-green-600 text-white " > your own

                  <br className="block sm:hidden" />
                  <TextMorphUI texts={["case", "card"]} /></span>now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8 ">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              {/* abs img */}
              <img
                src="/arrow.png"
                alt=""
                className="absolute dark:invert top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />
              {/* abs img */}

              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/5 lg:rounded-2xl   " >
                <img
                  src="/horse.jpg"
                  alt=""
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full "
                />
              </div>

              <div className="grid grid-flow-row grid-cols-1 gap-3 lg:gap-0 h-full" >

                <div className="grid-col-1  flex items-center justify-center h-full" > <Phone className="w-40 " imgSrc="/horse_phone.jpg" /> </div>

                <div className="grid-col-1 flex items-center justify-center h-full " > <Card className="w-72 rounded-3xl" imgSrc="/horse_card.png" /> </div>

              </div>

            </div>
          </div>

          {/* max-w-prose =  max-w:65c => 65characters maximum it is used for texts. */}
          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit " >
            <li>
              <Check className="h-5 w-5 text-green-600 inline mr-1.5 " />
              High-quality silicon material
            </li>
            <li>
              <Check className="h-5 w-5 text-green-600 inline mr-1.5 " />
              Scratch and fingerprint resistant coating
            </li>
            <li>
              <Check className="h-5 w-5 text-green-600 inline mr-1.5 " />
              Wireless charging compatible
            </li>
            <li>
              <Check className="h-5 w-5 text-green-600 inline mr-1.5 " />
              5 years print warranty
            </li>

            <div className="flex justify-center ">
              <ItemsOptions
                IsFromServerComp={true}
                triggerText="create your case now"
                size="lg"
                className="mx-auto mt-8"
              />

            </div>

          </ul>

        </MaxWidthWrapper>
      </section>

    </div>

  );
}
