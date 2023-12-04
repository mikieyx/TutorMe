import { NextResponse } from 'next/server'
import {Session} from "next-auth"
import {getServerSession} from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';
import type { NextApiRequest, NextApiResponse } from 'next';
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

    // Fetching classes from DB, not sure how to send result to frontend.
    try {
        const classData = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                classes: true  
            }
        })
        return classData;
        res.status(200).json({});
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}