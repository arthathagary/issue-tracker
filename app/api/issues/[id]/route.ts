import { issueSchema } from "@/app/validationScemas";
import prisma from "@/prisma/client";
import { data } from "autoprefixer";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(reqest:NextRequest,
    {params}:{params:{id:string}}){
        const body = await reqest.json();
        const validation = issueSchema.safeParse(body);
        if(!validation.success){
            return NextResponse.json(validation.error.format(),{status:400})
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
                description:body.description
            }
        })

        return NextResponse.json(updatedIssue,{status:200});

}

export async function DELETE(reqest:NextRequest,{params}:{params:{id:string}}){
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