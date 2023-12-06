import { NextResponse } from 'next/server'
import {Session} from "next-auth"
import {getServerSession} from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';


//Post request to create a new user
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
    console.log(req.body);
    try {
        const newMeeting = await prisma.meeting.create({
            data: {
                tutor_id: req.body.tutor_id,
                tutor_name: req.body.tutor_name,
                start_Time: req.body.start_Time,
                end_Time: req.body.end_Time,
                location: req.body.location,
                class: req.body.class,
            }
        });
        res.status(200).json({});
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}