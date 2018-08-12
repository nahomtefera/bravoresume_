import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from './vfs_fonts';
// import * as icons from '../images/base64/icons_b64.js';
import flower1 from '../images/base64/images/flowers1';

export default (items) => {
    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    var user, work_exp, education;

    user = items.user_info;
    work_exp = items.work_exp;
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
        },
        DancingScript: {
            normal: "DancingScript-Regular.ttf"
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
                        x: 0, y: 0, w: 595.28, h: 841.5,                        
                        color: '#EEFFFE'
                    },
                    {
                        // This is where the content is going to be
                        type: 'rect',
                        x: 40, y: 0, w: 515.28, h: 841,                        
                        color: '#ffffff'
                    },
                ],
            };
        },
        // We will now start passing the information
        content: [
            {
                // First we are going to draw a horizontal rectangle
                // And we will put the name and last name inside
                canvas: [
                    {
                        // This is the big box on the top
                        type: 'rect',
                        x: -40, y: -40, w: 595.28, h: 206,
                        color: '#81BEBA',
                        pageBreak: 'before',
                    },
                    {
                        type: 'rect',
                        x: 0, y: 130, w: 515.28, h: 40,                        
                        color: '#ffffff'
                    }

                ],

            },
            {
                image: flower1,
                width: 150,
                margin: [0, -100, 0, 0]
            },
            // We pass the name inside
            {
                text: (user.name || "Name") + " " + (user.last_name || "Last Name"),
                fontSize: 50,
                color: '#FFF',
                font: 'DancingScript',
                alignment: 'center',
                margin: [ 0, -175, 0, 95],
            },
            // We pass the position title
            {
                text: user.user_position || "Position",
                margin: [ 0, -100, 0, 95],                
                fontSize: 20,
                bold:true,
                color: '#fff',
                font: 'OpenSans',
                alignment: 'center',
            },
            // We create a table with two nested tables inside
            // And later on we will push the education 
            // To one of the nested tables and the work exp
            // To the other nested table
            {
                text: user.user_position || "P R O F I L E ",
                margin: [0, 0, 0, 10],
                fontSize: 14,
                bold: true,
                alignment: 'center'
            },
            {
                columns: [
                    {
                        width: '*',
                        text: " "
                    },
                    {
                        width: 370,        
                        text: user.user_profile || "Brief description of who you are, it shouldn't be more than 2 lines and should describe you as much as possible" 
                    },
                    {
                        width: '*',
                        text: " "
                    }
                ],
                margin: [0, 0, 0, -35],
                alignment: "justify",                
            },
            {
                style: 'tableExample',
                margin: [-40, 0, 0, 0],
                table: {
                    widths: [250, 290], 
                    body: [
                        [{
                            // style: 'right',
                            table: {
                                widths: ['*'],
                                body: [
                                    // We will First push CONTACT info and the EDUCATION
                                    [{text: "C O N T A C T", bold: true, fontSize:14, margin:[100, 60, 0, 5] }],
                                    [{text: user.email || "youremail@domain.com", margin:[100, 0, 0, 0]}],
                                    [{text: user.phone || "000-000-0000", margin:[100, 0, 0, 0] }],
                                    [{text: user.location || "Location", margin:[100, 0, 0, 0] }],
                                    // EDUCATION will be pushed here
                                    [{text: "E D U C A T I O N", bold: true, fontSize:14, margin:[100, 20, 0, 5] }]
                                ]
                            },
                            layout: 'noBorders'
                            
                        },
                        {
                            table: {
                                widths: ['270'],
                                body: [
                                    // WORK experience will be pushed here
                                    [{text: "W O R K   E X P E R I E N C E", bold: true, fontSize:14, margin:[40, 60, 0, 5] }]
                                    
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
            docDefinition.content[6].table.body[0][0].table.body.push(
                [{text: 'Degree', style: 'tableHeader',bold: true, margin:[100, 0, 0, 0]}],
                [{text: 'Institution', margin:[100, 0, 0, 0]}],
                [{text: "Year - Year ", margin:[100, 0, 0, 15]}]
            )         
        }else{
            education.map((school)=>{
                docDefinition.content[6].table.body[0][0].table.body.push(
                    [{text: school.degree || "Degree or Certificate", style: 'tableHeader',bold: true, margin:[100, 0, 0, 0]}],
                    [{text: (school.school || "Institution"), margin:[100, 0, 0, 0]} ],
                    [{text: school.date || "Year - Year", margin: [100, 0, 0, 15]}]
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
            docDefinition.content[6].table.body[0][1].table.body.push(
                [{text: 'Job Title - Company', style: 'tableHeader',bold: true, margin: [40, 0, 0, 0] }],
                [{text:'Location  Year - Year', margin: [40, 0, 0, 0]}],
                [{text:"Describe your job responsibilities, accomplishments and technologies you have used. It's highly recommended that you use bullet points to describe your experience." , margin: [40, 0, 0, 15]}]            
            )         
        }else{
            work_exp.map((job)=>{
                docDefinition.content[6].table.body[0][1].table.body.push(
                    [{text: (job.title || "Degree or Certificate") + " - " + (job.company || "Institution"), style: 'tableHeader',bold: true, margin: [40, 0, 0, 0]}],
                    [{text: (job.location || "Location") + "  " + (job.date || "Year - Year"), margin: [40, 0, 0, 0] }],
                    [{
                        ul: job.bullet_points.map((bullet)=>{return bullet.description}),
                        margin: [40, 0, 0, 0]
                    }],
                    // [{text: "Describe your job responsibilities, accomplishments and technologies you have used. It's highly recommended that you use bullet points to describe your experience.", margin: [40, 0, 0, 15]}]
                )
            })
        }
    }

    workColumn()
    pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
        // console.log(outDoc)
        document.getElementById('pdfV').src = outDoc;
    });
    // .download((user.last_name||"LastName") + "_" +(user.name||"Name") + ".pdf");    
}