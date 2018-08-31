import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from './vfs_fonts';
// import * as icons from '../images/base64/icons_b64.js';
// import flower1 from '../images/base64/images/flowers1';

export default (items) => {
    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    let user, work_exp, education, projects;

    user = items.user_info;
    work_exp = items.work_exp;
    projects = items.projects;
    education = items.education;

    // We add new font OpenSans
    pdfMake.fonts = {
        OpenSans: {
            normal: "OpenSans.ttf",
            bold: "OpenSans.ttf"
        },
        JosefinSans: {
            normal: "Josefin-Thin.ttf",
            bold: "Josefin-Thin.ttf",
        },
        Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf"
        },
        DancingScript: {
            normal: "DancingScript-Regular.ttf",
            bold: "DancingScript-Regular.ttf"
        },
        Merriweather: {
            normal: "Merriweather-Regular.ttf",
            bold: "Merriweather-Bold.ttf"
        }
    }   
    // We create the object that will store what we want to print
    // Once created we will first pass the user info
    var docDefinition = {
        // We will now start passing the information
        pageSize: {height: (279.4 / 0.35277), width: (216 / 0.35277)},

        content: [
            // We pass the name inside
            {
                columns: [
                    {
                        alignment: 'left', 
                        fontSize: 33, color: "#434343", 
                        font: "Merriweather", 
                        margin: [0, -18, 0, 10],
                        text: [
                            {text: user.name + " "},
                            {text: user.last_name, bold:true} 
                        ]
                    },
                    {
                        alignment: "left", 
                        type:'none', 
                        width: 150,
                        margin: [0, -18, 0, 10],
                        fontSize: 10.3,
                        color: '#2d2d2d',
                        ul:[
                            user.location,
                            user.email,
                            user.phone
                        ]
                    },

                ]
            }

        ]       
    }

    // Now we will create another function
    // That will push the work information
    // Into the other nested table
    var workColumn = ()=>{

        if(work_exp.length===0) {
            return
        }else{
            docDefinition.content.push([{text: "PROFESSIONAL EXPERIENCE", fontSize:12, color: "#434343", bold:true, margin:[0, 15, 0, 0] }])

            work_exp.map((job)=>{
                docDefinition.content.push(
                    [{columns: [
                        {alignment: 'left', fontSize: 10, margin:[0, 6, 0, 6], bold: true, text: `${job.company} | ${job.title} | ${job.location}`},
                        {alignment: 'right', fontSize: 10, margin:[0, 6, 0, 0], text: job.date},
                    ]}],
                    // [{text: job.location, fontSize: 10, bold: true, margin: [0, 0, 0, 5] }],
                    [{
                        type: 'circle',
                        ul: job.bullet_points.map((bullet)=>{return bullet.description}),
                        fontSize: 10.3, margin: [20, 0, 0, 6],
                        color: "#2a2a2a"
                    }],                
                )
            })
        }
    }

    workColumn()


    // We are going to create a function
    // That will push the education info
    // Into one of the nested tables
    var eduColumn = ()=>{
        if(education.length===0) {
            return   
        }else{
            docDefinition.content.push([{text: "EDUCATION", color: "#434343", alignment: "left", fontSize:12, bold:true, margin:[0, 15, 0, 5] }])

            education.map((school)=>{
                docDefinition.content.push(
                    [{columns: [
                        {
                            width: "*",
                            text: [{text: school.degree + " | ", fontSize: 10, bold:true}, {text: school.school, fontSize: 10, bold:false}], 
                            alignment: 'left', 
                        },
                        {
                            width: 100,
                            text: school.date, alignment: 'right', fontSize: 10,
                            margin:[0, 0, 0, 5]
                        },
                    ]}]
                )
            })
        }
    }

    eduColumn()

    // Now we will create another function
    // That will push the work information
    // Into the other nested table
    var projectColumn = ()=>{

        if(projects.length===0) {
            return
        }else{
            docDefinition.content.push([{text: "PROJECTS", color: "#434343", fontSize:12, bold:true, margin:[0, 15, 0, 0] }])

            projects.map((project)=>{
                docDefinition.content.push(
                    [{columns: [
                        {alignment: 'left', fontSize: 10, margin:[0, 6, 0, 6], bold: true, text: `${project.company} | ${project.title} | ${project.location}`},
                        {alignment: 'right', fontSize: 10, margin:[0, 6, 0, 0], text: project.date},
                    ]}],
                    // [{text: project.location, bold: true, fontSize: 10, margin: [0, 0, 0, 5] }],
                    [{
                        type: 'circle',
                        ul: project.bullet_points.map((bullet)=>{return bullet.description}),
                        fontSize: 10.3, margin: [20, 0, 0, 6],
                        color: "#2a2a2a"
                    }],                
                )
            })
        }
    }

    projectColumn()


    pdfMake.createPdf(docDefinition).download((user.last_name||"LastName") + "_" +(user.name||"Name") + ".pdf");   
    
}