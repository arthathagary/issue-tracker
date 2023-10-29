import authOptions from "@/app/auth/authOptions";
import { pathIssueSchema } from "@/app/validationScemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(reqest:NextRequest,
    {params}:{params:{id:string}}){
        // const session = await getServerSession(authOptions);
        // if(!session)
        //     return NextResponse.json({},{status:401})
        const body = await reqest.json();
        const validation = pathIssueSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json(validation.error.format(),{status:400})
        }
        if(body.assignedToUserId){
            const user = prisma.user.findUnique({
                where:{id:body.assignedToUserId}
            })

            if(!user)
                return NextResponse.json({error:'Invalid User'},{status:400})
        }

        const issue =await prisma.issue.findUnique({
            where:{id:parseInt(params.id) }
        })

        if(!issue){
            return NextResponse.json({error:'Not a valid issue'},{status:404})
        }

        const updatedIssue = await prisma.issue.update({
            where:{id:issue!.id},
            data:{
                title : body.title,
                description:body.description,
                assignedToUserId:body.assignedToUserId
            }
        })

        return NextResponse.json(updatedIssue,{status:200});

}

export async function DELETE(reqest:NextRequest,{params}:{params:{id:string}}){
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({},{status:401})
    const issue = await prisma.issue.findUnique({
        where: {id:parseInt(params.id)}
    })

    if(!issue)
        return NextResponse.json({error:'Not a valid issue'},{status:404})

    await prisma.issue.delete({
        where:{id:issue.id}
    })

    return NextResponse.json({},{status:200})
}