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
                fontSize: 33, font: "Merriweather", margin: [0, -18, 0, 10], 
                alignment: 'center', color: "#434343",                
                text: [{text: user.name + " "}, {text: user.last_name, bold:true}]
            },
            {
                margin: [-10, 25, 0, 0,],
                style: 'tableExample',
                table: {
                    body: [
                        [{
                            // content[1].table.body[0][0].table.body
                            table: {
                                widths: [160], 
                                body: [
                                    // We will First push CONTACT info and the EDUCATION
                                    [{text: "Contact ", bold: true}],
                                    [{text: user.email, fontSize: 10}],
                                    [{text: user.location, alignment: "left", fontSize: 10}],
                                    [{text: user.phone, alignment: "left", fontSize: 10}],
                                    // EDUCATION will be pushed here
                                    
                                ]
                            },
                            layout: 'noBorders'
                        },
                        // content[1].table.body[0][1].table.body

                        {
                            table: {
                                widths: [375],
                                body: [
                                    // WORK experience will be pushed here
                                    
                                ]
                            },
                            layout: 'noBorders'

                        }]
                    ]
                },
                layout: 'noBorders'
                
            }
            
        ],
             
    }




    // Now we will create another function
    // That will push the work information
    // Into the other nested table
    var workColumn = ()=>{

        if(work_exp.length===0) {
            return      
        }else{
            work_exp.map((job)=>{
                docDefinition.content[1].table.body[0][1].table.body.push([{text: "Professional Experience", fontSize:12, bold:true}])

                docDefinition.content[1].table.body[0][1].table.body.push(
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
            docDefinition.content[1].table.body[0][0].table.body.push([{text: "Education", alignment: "left", fontSize:12, bold:true, margin: [0, 20, 0, 0] }])

            education.map((school)=>{
                docDefinition.content[1].table.body[0][0].table.body.push(
                    [{text: school.degree, margin: [0, 5, 0, 0], fontSize:10, bold: true }],
                    [{text: school.school , fontSize:10}],
                    [{text: school.date, fontSize: 10}],
                )
            });

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
            // Title
            docDefinition.content[1].table.body[0][1].table.body.push([{text: "Projects", fontSize:12, bold:true, margin:[0, 10, 0, 0] }])

            projects.map((project)=>{
                docDefinition.content[1].table.body[0][1].table.body.push(
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
            });
        }
    }

    projectColumn()


    pdfMake.createPdf(docDefinition).download((user.last_name||"LastName") + "_" +(user.name||"Name") + ".pdf");   
    
}