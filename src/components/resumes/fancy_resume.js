import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from './vfs_fonts';
// import * as icons from '../images/base64/icons_b64.js';

export default (items) => {
    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    var user, work_exp, education;

    user = items.user_info;
    work_exp = items.work_experience;
    education = items.education;
    
    // We add new font OpenSans
    pdfMake.fonts = {
        OpenSans: {
            normal: "OpenSans.ttf",
            bold: "OpenSans.ttf"
        },
        Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf"
        }
    }
    
    // We create the object that will store what we want to print
    // Once created we will first pass the user info
    var docDefinition = {
        // We are going draw a vertical rectangle
        // That goes from the top to the bottom
        background: function () {
            return {
                canvas: [
                    {
                        type: 'rect',
                        x: 0, y: 0, w: 215, h: 841,                        
                        color: '#d1ddd1'
                    }
                ]
            };
        },
        // We will now start passing the information
        content: [
            {
                // First we are going to draw a horizontal rectangle
                // And we will put the name and last name inside
                canvas: [
                    {
                        type: 'rect',
                        x: -40, y: -40, w: 595.28, h: 156,
                        color: '#33342f',
                        pageBreak: 'before',
                    },
                ]
            },
            // We pass the name inside
            {
                text: (user.user_name || "Name") + " " + (user.user_last_name || "Last Name"),
                fontSize: 45,
                color: '#ffffff',
                font: 'OpenSans',
                alignment: 'center',
                margin: [ 0, -115, 0, 75],
            },
            {
                text: (user.user_position || "Position"),
                fontSize: 20,
                color: '#ffffff',
                font: 'OpenSans',
                alignment: 'center',
                margin: [ 0, -75, 0, 40],                
            },
            // We create a table with two nested tables inside
            // And later on we will push the education 
            // To one of the nested tables and the work exp
            // To the other nested table
            {
                style: 'tableExample',
                margin: [-40, 0, 0, 0],
                table: {
                    widths: [190, 350],
                    body: [
                        [{
                            style: 'right',
                            table: {
                                widths: ['*'],
                                body: [
                                    // We will First push CONTACT info and the EDUCATION
                                    [{text: "C O N T A C T", bold: true, fontSize:14, margin:[0, 60, 0, 5] }],
                                    [{text: user.user_email_address || "youremail@domain.com"}],
                                    [{text: user.user_phone_number || "000-000-0000"}],
                                    [{text: user.user_home_address || "Home Address", margin:[0, 0, 0, 25] }],
                                    // EDUCATION will be pushed here
                                    [{text: "E D U C A T I O N", bold: true, fontSize:14, margin:[0, 20, 0, 5] }]
                                ]
                            },
                            layout: 'noBorders'
                            
                        },
                        {
                            table: {
                                widths: ['*'],
                                body: [
                                    // WORK experience will be pushed here
                                    [{text: "W O R K   E X P E R I E N C E", bold: true, fontSize:14, margin:[40, 20, 0, 5] }]
                                    
                                ]
                            },
                            layout: 'noBorders'
                            
                        }]
                    ]
                },
                layout: 'noBorders'
                
            },
        ],
        styles: {
            right: {
                alignment: 'right'
            }
        }                
    }

    // We are going to create a function
    // That will push the education info
    // Into one of the nested tables
    var eduColumn = ()=>{
        if(education.length===0) {
            docDefinition.content[3].table.body[0][0].table.body.push(
                [{text: 'Degree', style: 'tableHeader',bold: true,  alignment: 'right'}],
                [{text: 'Institution'}],
                [{text: "Year - Year ", margin:[0, 0, 0, 15]}]
            )         
        }else{
            education.map((school)=>{
                docDefinition.content[3].table.body[0][0].table.body.push(
                    [{text: school.degree || "Degree or Certificate", style: 'tableHeader',bold: true}],
                    [{text: (school.school_name || "Institution")} ],
                    [{text: school.year || "Year - Year", margin: [0, 0, 0, 15]}]
                )
            })
        }
    }

    eduColumn()

    // Now we will create another function
    // That will push the work information
    // Into the other nested table
    var workColumn = ()=>{
        if(work_exp.length===0) {
            docDefinition.content[3].table.body[0][1].table.body.push(
                [{text: 'Job Title - Company', style: 'tableHeader',bold: true, margin: [40, 0, 0, 0] }],
                [{text:'Location  Year - Year', margin: [40, 0, 0, 0]}],
                [{text:"Describe your job responsibilities, accomplishments and technologies you have used. It's highly recommended that you use bullet points to describe your experience." , margin: [40, 0, 0, 15]}]            
            )         
        }else{
            work_exp.map((job)=>{
                docDefinition.content[3].table.body[0][1].table.body.push(
                    [{text: (job.job_title || "Degree or Certificate") + " - " + (job.job_company || "Institution"), style: 'tableHeader',bold: true, margin: [40, 0, 0, 0]}],
                    [{text: (job.job_location || "Location") + "  " + (job.job_date || "Year - Year"), margin: [40, 0, 0, 0] }],
                    [{text: job.job_description || "Describe your job responsibilities, accomplishments and technologies you have used. It's highly recommended that you use bullet points to describe your experience.", margin: [40, 0, 0, 15]}]
                )
            })
        }
    }

    workColumn()
    
    pdfMake.createPdf(docDefinition).download((user.user_last_name||"LastName") + "_" +(user.user_name||"Name") + ".pdf");    
}