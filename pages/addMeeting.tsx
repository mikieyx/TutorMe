import React from 'react'
import Select from 'react-select'
import prisma from '../lib/prisma';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { User } from '@prisma/client';

// model Meeting {
//     meeting_id String          @default(cuid()) @id
//     tutor User  @relation(name: "tutor", fields: [tutor_id], references: [user_id])
//     tutor_id String
//     tutee User  @relation(name: "tutee", fields: [tutee_id], references: [user_id])
//     tutee_id String
//     date  DateTime
//     booked Boolean
//     location String
//     class String
// }

type Props = {
    user: User
}

export default function AddMeeting({user}: Props){

    return<>
        <h1>Add Meeting</h1>
        <div>
            <h2>Class</h2>
            <Select></Select>
        </div>
        <div>
            <h2>Location</h2>
            <input></input>
        </div>
        <div>
            <h2>Date and Time</h2>
            <input type="datetime-local"></input>
        </div>
        <button>Submit</button>
        
    </>
}

export async function getServerSideProps(context){
    const session: Session = await getServerSession(context.req, context.res, authOptions)
    
    if (!session){
        return {
            redirect: {
                destination: './loginPage',
                permanenet: false,
            },
        }
    }
    const email = session.user.email
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })


    if (!user){
        return {
            redirect: {
                destination: './onboard',
                permanent: false
            }
        }
    }
    return {props: {session, user}};
} 