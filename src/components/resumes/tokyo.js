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
        },
        Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf"
        },
        DancingScript: {
            normal: "DancingScript-Regular.ttf"
        }
    }   
    // We create the object that will store what we want to print
    // Once created we will first pass the user info
    var docDefinition = {
        // We will now start passing the information
        background: function() {
            // you can apply any logic and return any valid pdfmake element
        
            return { 
                canvas: [
                    
                    
                ],
           
            };
        },
        pageSize: {height: (279.4 / 0.35277), width: (216 / 0.35277)},

        content: [
            // We pass the name inside
            {
                alignment: "center",
                margin: [0, -18, 0, 10],
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ["*", 'auto', "*"],
                    body: [
                        [{ text: "", border: [false, false, false, false]}, { color: "#434343", text: (user.name || "Name") + " " + (user.last_name || "Last Name"), fontStyle: "Roboto", bold: true, fontSize: 25, margin:[8, 0, 8, 0]}, { text: " ", border: [false, false, false, false]}],
                    ]
                }
            },
            {
                columns: [
                    {alignment: 'center', fontSize: 10, text: user.location},
                    {alignment: 'center', fontSize: 10, text: user.email},
                    {alignment: 'center', fontSize: 10, text: user.phone}
                ]
            }

        ],
        styles: {
            right: {
                alignment: 'right'
            }
        }                
    }

    // Now we will create another function
    // That will push the work information
    // Into the other nested table
    var workColumn = ()=>{
        docDefinition.content.push([{text: "PROFESSIONAL EXPERIENCE", color: "#434343", fontSize:12, bold:true, margin:[0, 15, 0, 0] }])

        if(work_exp.length===0) {
            docDefinition.content.push(
                [{text: 'No experience', style: 'tableHeader',bold: true, margin: [15, 0, 0, 0] }],        
            )         
        }else{
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
        docDefinition.content.push([{text: "EDUCATION", color: "#434343", alignment: "left", fontSize:12, bold:true, margin:[0, 15, 0, 5] }])
        if(education.length===0) {
            docDefinition.content.push(
                [{text: 'No Education', style: 'tableHeader',bold: true, alignment: "left", fontSize: 10, margin:[0, 0, 0, 0]}],
            )         
        }else{
            education.map((school)=>{
                docDefinition.content.push(
                    [{columns: [
                        {alignment: 'left', fontSize: 10, margin:[0, 0, 0, 0], bold: true, text: school.degree},
                        {alignment: 'right', fontSize: 10, bold: true, text: school.date},
                    ]}],
                    [{text: `${school.school}` || "Degree or Certificate", alignment: "left", style: 'tableHeader', fontSize: 10.3, margin:[0, 0, 0, 5]}],
                )
            })
        }
    }

    eduColumn()

    // Now we will create another function
    // That will push the work information
    // Into the other nested table
    var projectColumn = ()=>{
        docDefinition.content.push([{text: "PROJECTS", color: "#434343", fontSize:12, bold:true, margin:[0, 15, 0, 0] }])

        if(projects.length===0) {
            docDefinition.content.push(
                [{text: 'No projects', style: 'tableHeader', margin: [0, 0, 0, 0] }],      
            )         
        }else{
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