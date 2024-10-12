import { fetchProfileAction } from "@/actions";
import HomepageButtonControls from "@/components/homepage-button-controls";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Fragment } from "react";

async function Home() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <Fragment>
      <section className="relative w-full h-full min-h-screen pb-10 bg-gray-50 dark:bg-gray-900">
        <div className="w-full h-full relative">
          <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16 ml-10">
            <section className="w-full lg:w-1/2 flex flex-col md:px-2 lg:px-0 p-5 lg:p-10">
              <div className="w-full flex justify-start flex-col h-auto lg:pt-7">
                <span className="flex space-x-2">
                  <span className="block w-14 mb-2 dark:border-white border-b-2 border-gray-700"></span>
                  <span className="font-medium dark:text-white text-gray-600">
                    Empowering Fair and Secure Hiring
                  </span>
                </span>
                <h1 className="text-3xl dark:text-white mt-5 lg:text-7xl text-black font-extrabold">
                  Begin Your Journey in a Safe and Fair Job Market
                </h1>
                <p className="mt-4 text-lg dark:text-gray-300 text-gray-700">
                  SecureRecruit modernizes the recruitment process by leveraging advanced privacy-preserving technologies. We ensure that your personal data remains secure while providing a bias-free and transparent hiring experience.
                </p>
                <div className="w-full mt-6 flex items-center text-white justify-start gap-2">
                  <HomepageButtonControls
                    user={JSON.parse(JSON.stringify(user))}
                    profileInfo={profileInfo}
                  />
                </div>
              </div>
            </section>
            <section className="relative w-full lg:w-1/2 flex items-center justify-end">
              <img
                src="https://utfs.io/f/4c9f7186-8ad0-4680-aece-a5abea608705-k6t10e.png"
                alt="Hero"
                className="h-full w-full object-contain z-10"
              />
            </section>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mt-20 p-5 lg:p-10">
            <section className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col justify-between h-full">
                <h2 className="text-2xl lg:text-3xl font-bold dark:text-white text-gray-900">
                  Privacy Concerns
                </h2>
                <p className="mt-4 text-lg dark:text-gray-300 text-gray-700 h-24">
                  Protecting candidates' sensitive information using zero-knowledge proofs ensures that your data remains private and secure throughout the recruitment process.
                </p>
              </div>
            </section>
            <section className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col justify-between h-full">
                <h2 className="text-2xl lg:text-3xl font-bold dark:text-white text-gray-900">
                  Bias-Free Hiring
                </h2>
                <p className="mt-4 text-lg dark:text-gray-300 text-gray-700 h-24">
                  By only revealing necessary job qualification information and keeping demographic data hidden, we eliminate biases in the hiring process.
                </p>
              </div>
            </section>
            <section className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col justify-between h-full">
                <h2 className="text-2xl lg:text-3xl font-bold dark:text-white text-gray-900">
                  Verification Integrity
                </h2>
                <p className="mt-4 text-lg dark:text-gray-300 text-gray-700 h-24">
                  Our platform ensures the authenticity of candidate credentials without direct access to personal documents, enhancing trust and reliability in the hiring process.
                </p>
              </div>
            </section>
          </div>
          <div className="flex flex-col items-center mt-20 p-5 lg:p-10">
            <h2 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 text-center">
              Join SecureRecruit Today
            </h2>
            <p className="mt-4 text-lg dark:text-gray-300 text-gray-700 text-center">
              Sign up now and be part of a secure, fair, and efficient job recruitment community. Let's revolutionize the way we hire, together.
            </p>
            <div className="mt-6 flex justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Home;
