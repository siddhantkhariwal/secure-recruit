"use client";

import { membershipPlans } from "@/utils";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { updateProfileAction } from "@/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { web3, initWeb3 } from "@/web3";

function Membership({ profileInfo }) {
  const pathName = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    initWeb3();
    setHydrated(true); // Mark as hydrated after initial render
  }, []);

  async function handlePayment(getCurrentPlan) {
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
        await updateProfile();
      } else {
        console.error("MetaMask wallet connection failed");
      }
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
    setLoading(false);
  }

  async function updateProfile() {
    const fetchCurrentPlanFromSessionStroage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );

    await updateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanFromSessionStroage?.type,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: new Date(
          new Date().getFullYear() +
            (fetchCurrentPlanFromSessionStroage?.type === "basic"
              ? 1
              : fetchCurrentPlanFromSessionStroage?.type === "teams"
              ? 2
              : 5),
          new Date().getMonth(),
          new Date().getDate()
        ),
      },
      "/membership"
    );
  }

  useEffect(() => {
    if (pathName.get("status") === "success") updateProfile();
  }, [pathName]);

  console.log(profileInfo);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
          {profileInfo?.isPremiumUser
            ? "You are a premium user"
            : "Choose Your Best Plan"}
        </h1>
        <div>
          {profileInfo?.isPremiumUser ? (
            <Button className="flex h-11 items-center justify-center px-5">
              {
                membershipPlans.find(
                  (planItem) => planItem.type === profileInfo?.memberShipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {hydrated &&
              membershipPlans.map((plan, index) => (
                <CommonCard
                  key={index}
                  icon={
                    <div className="flex justify-between">
                      <div>
                        <JobIcon />
                      </div>
                      <h1 className="font-bold text-2xl text-gray-950">{plan.heading}</h1>
                    </div>
                  }
                  title={`$ ${plan.price} /yr`}
                  description={
                    <ul className="list-disc pl-5 space-y-2">
                      {plan.perks.map((perk, perkIndex) => (
                        <li key={perkIndex} className="text-gray-900 dark:text-black-400">
                          {perk}
                        </li>
                      ))}
                    </ul>
                  }
                  footerContent={
                    profileInfo?.memberShipType === "enterprise" ||
                    (profileInfo?.memberShipType === "basic" && index === 0) ||
                    (profileInfo?.memberShipType === "teams" &&
                      index >= 0 &&
                      index < 2 ? null : (
                      <Button
                        onClick={() => handlePayment(plan)}
                        className="disabled:opacity-65 dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
                      >
                        {loading ? "Processing..." : profileInfo?.memberShipType === "basic" ||
                        profileInfo?.memberShipType === "teams"
                          ? "Update Plan"
                          : "Get Premium"}
                      </Button>
                    ))
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
