import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from './vfs_fonts';
// import * as icons from '../images/base64/icons_b64.js';
// import flower1 from '../images/base64/images/flowers1';

export default (items) => {
    const {vfs} = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;
    let user, work_exp, education;

    user = items.user_info;
    work_exp = items.work_exp;
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
                    {
                        type: 'rect',
                        x: 0, y: 0, w: 595.28, h:841.5,                        
                        color: '#efefef'
                    },
                    {
                        type: 'rect',
                        x: 0, y: 0, w: 595.28, h:20,                        
                        color: '#dfdfdf'
                    },
                    {
                        type: 'rect',
                        x: 0, y: 19.1, w: 595.28, h:1,                        
                        color: '#232323'
                    },
                    {
                        type: 'rect',
                        x: 0, y: 0, w: 20, h:841.5,                        
                        color: '#dfdfdf'
                    },
                    {
                        type: 'rect',
                        x: 19.15, y: 19.1, w: 1, h:822.5,                        
                        color: '#232323'
                    },
                    {
                        type: 'rect',
                        x:575.28, y: 0, w: 20, h:841.5,                        
                        color: '#dfdfdf'
                    },
                    {
                        type: 'rect',
                        x:574.28, y: 19, w: 1, h:822.5,                        
                        color: '#232323'
                    },
                    {
                        type: 'rect',
                        x:0, y: 821.5, w: 595.28, h:20,                        
                        color: '#dfdfdf'
                    },
                    {
                        type: 'rect',
                        x:20, y: 820.5, w: 554.28, h:1,                        
                        color: '#232323'
                    },
                    
                    
                ],
           
            };
        },
        content: [
            // We pass the name inside
            {
                alignment: "center",
                margin: [0, 25, 0, 30],
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ["*", 'auto', "*"],
                    body: [
                        [{ text: "", border: [false, false, false, false]}, { text: (user.name || "Name") + " " + (user.last_name || "Last Name"), font:"OpenSans", bold: true, fontSize: 27, margin:[16, 0, 16, 0]}, { text: " ", border: [false, false, false, false]}],                    
                    ]
                }
            },
            {
                style: 'tableExample',
                margin: [-40, -65, 0, 0],
                table: {
                    widths: [160, 340], 
                    body: [
                        [{
                            // style: 'right',
                            table: {
                                widths: ['*'],
                                body: [
                                    // We will First push CONTACT info and the EDUCATION
                                    [{text: "C O N T A C T", bold: true, fontSize:14, color: "#151515", alignment: "left", margin:[50, 60, 0, 5] }],
                                    [{text: user.email || "youremail@domain.com", alignment: "left", fontSize: 9, margin:[50, 0, 0, 0]}],
                                    [{text: user.phone || "000-000-0000", alignment: "left", fontSize: 9, margin:[50, 0, 0, 0] }],
                                    [{text: user.location || "Home Address", alignment: "left",fontSize: 9,  margin:[50, 0, 0, 0] }],
                                    // EDUCATION will be pushed here
                                    [{text: "E D U C A T I O N", bold: true, alignment: "left", fontSize:14, margin:[50, 20, 0, 5] }]
                                ]
                            },
                            layout: 'noBorders'
                            
                        },
                        {
                            table: {
                                widths: ['320'],
                                body: [
                                    // WORK experience will be pushed here
                                    [{text: "W O R K   E X P E R I E N C E", bold: true, fontSize:14, margin:[15, 60, 0, 5] }]
                                    
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
            docDefinition.content[1].table.body[0][0].table.body.push(
                [{text: 'Degree', style: 'tableHeader',bold: true, alignment: "left", fontSize: 9, margin:[50, 0, 0, 0]}],
                [{text: 'Institution', alignment: "left", fontSize: 9, margin:[50, 0, 0, 0]}],
                [{text: "Year - Year ", alignment: "left", fontSize: 9, margin:[50, 0, 0, 10]}]
            )         
        }else{
            education.map((school)=>{
                docDefinition.content[1].table.body[0][0].table.body.push(
                    [{text: school.degree || "Degree or Certificate", alignment: "left", style: 'tableHeader',bold: true, fontSize: 9, margin:[50, 0, 0, 0]}],
                    [{text: (school.school || "Institution"), alignment: "left", fontSize: 9, margin:[50, 0, 0, 0]} ],
                    [{text: school.date || "Year - Year", alignment: "left", fontSize: 9, margin: [50, 0, 0, 10]}]
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
            docDefinition.content[1].table.body[0][1].table.body.push(
                [{text: 'Job Title - Company', style: 'tableHeader',bold: true, margin: [15, 0, 0, 0] }],
                [{text:'Location  Year - Year', margin: [15, 0, 0, 0]}],
                [{text:"Brifely escribe your job responsibilities, accomplishments and technologies you have used.", margin: [15, 0, 0, 15]}]            
            )         
        }else{
            work_exp.map((job)=>{
                docDefinition.content[1].table.body[0][1].table.body.push(
                    [{text: (job.title || "Degree or Certificate") + " - " + (job.company || "Institution"), style: 'tableHeader',bold: true, fontSize: 10, margin: [15, 0, 0, 0]}],
                    [{text: (job.location || "Location") + "  " + (job.date || "Year - Year"), fontSize: 10, margin: [15, 0, 0, 0] }],
                    [{
                        ul: job.bullet_points.map((bullet)=>{return bullet.description}),
                        fontSize: 10, margin: [25, 0, 0, 0]
                    }],                
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