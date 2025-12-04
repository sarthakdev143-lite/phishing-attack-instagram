"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export type VotingCampaign = {
    id: string
    candidateName: string
    candidateImage: string
    title: string
    description: string
    category: string
}

const campaigns: Record<string, VotingCampaign> = {
    "bodybuilding": {
        id: "bodybuilding",
        candidateName: "Lakshya Likhar",
        candidateImage: "/lakshya-bodybuilding.jpg",
        title: "Vote for Lakshya Likhar",
        description: "Champion Bodybuilder competing for Mr. Indore 2026. Support his journey to greatness with your vote!",
        category: "Bodybuilding Competition"
    },
    "hackathon": {
        id: "hackathon",
        candidateName: "Sarthak Parulekar",
        candidateImage: "/sarthak-hackathon.jpg",
        title: "Vote for Sarthak Parulekar",
        description: "Innovative developer who built an AI-powered sustainability platform. Help him win the Global Tech Hackathon!",
        category: "Tech Hackathon 2026"
    }
}

export default function VotingPage({ onVoteClick }: { onVoteClick: (campaign: VotingCampaign) => void }) {
    const [campaign, setCampaign] = useState<VotingCampaign | null>(campaigns.bodybuilding)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Detect campaign from hostname
        const hostname = window.location.hostname
        let detectedCampaign: VotingCampaign | null = null

        if (hostname.includes("vote-bodybuilding")) {
            detectedCampaign = campaigns.bodybuilding
        } else if (hostname.includes("vote-hackathon")) {
            detectedCampaign = campaigns.hackathon
        } else {
            detectedCampaign = campaigns.hackathon
        }

        setCampaign(detectedCampaign)
        setIsLoading(false)
    }, [])

    const handleVote = () => {
        if (campaign) {
            // Store voting context in session storage
            sessionStorage.setItem("votingCampaign", JSON.stringify(campaign))
            onVoteClick(campaign)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="flex items-center gap-2">
                    <svg aria-label="Loading..." className="animate-spin scale-150" role="img" viewBox="0 0 100 100" width="50" height="50">
                        <rect className="fill-black dark:fill-white" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect>
                        <rect className="fill-black dark:fill-white" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect>
                    </svg>
                </div>
            </div>
        )
    }

    if (!campaign) {
        return <>We are unable to reach to our servers for a moment. Error : 506</>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-4 py-12 text-black dark:text-white">
            <div className="w-full max-w-[500px] flex flex-col items-center">
                {/* Voting Card */}
                <div className="w-full border border-[#DBDBDB] dark:border-gray-700 px-8 py-10 mb-3 flex flex-col items-center bg-white dark:bg-black">
                    {/* Instagram Logo */}
                    <div className="mb-8">
                        <Image
                            src="/ig-logo.png"
                            alt="Instagram"
                            className="mix-blend-difference invert w-[14.5rem]"
                            width={175}
                            height={100}
                        />
                    </div>

                    {/* Category Badge */}
                    <div className="mb-6 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:border-pink-500/20 rounded-full">
                        <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                            {campaign.category}
                        </p>
                    </div>

                    {/* Candidate Image */}
                    <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg">
                        <Image
                            src={campaign.candidateImage}
                            alt={campaign.candidateName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold mb-3 text-center flex items-center gap-1">
                        {campaign.title}  <svg className="w-5.5 h-5.5 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </h1>

                    {/* Verification Badge */}
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Verified by Instagram</span>
                    </div>

                    {/* Description */}
                    <p className="text-base text-gray-600 dark:text-gray-400 text-center mb-8 px-4 leading-relaxed">
                        {campaign.description}
                    </p>

                    {/* Vote Button */}
                    <Button
                        onClick={handleVote}
                        className="w-full rounded-lg py-6 text-[1.2rem] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                    >
                        Vote Now
                    </Button>
                </div>

                {/* Info Card */}
                <div className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-6 flex flex-col items-center text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        🔒 Secure voting powered by Instagram authentication
                    </p>
                </div>
            </div>
        </div>
    )
}
