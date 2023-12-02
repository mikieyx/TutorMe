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

    try {
        const newUser = await prisma.user.create({
            data: {
                firstName: session.profile.given_name,
                lastName: session.profile.family_name,
                email: session.profile.email,
                is_Tutor: req.body.is_Tutor
            }
        });
        res.status(200).json({is_Tutor: req.body.is_Tutor});
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}