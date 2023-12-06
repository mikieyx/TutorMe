import { NextResponse } from 'next/server'
import {Session} from "next-auth"
import {getServerSession} from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session: Session = await getServerSession(req, res, authOptions)
    if (!session){
        res.status(401).json({ message: "You must be logged in"});
        return;
    }
    if(req.method !== "POST") {
        res.status(405).json({message: "Not POST"})
        return;
    }

    try {
        const meetingData = await prisma.meeting.update({
            where: {
                meeting_id: req.body.meeting_id,
            },
            data: {
                tutee_id: req.body.tutee_id,
            }
        })
        res.status(200).json({});
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}