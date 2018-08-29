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

        content:  [
            {
                margin: [-10, 25, 0, 0,],
                table: {body: [[
                        {// LEFT-SIDE: content[1].table.body[0][0].table.body
                            table: {
                                widths: [160], 
                                body: [
                                    // We will First push CONTACT info and the EDUCATION
                                    [{text: "Contact ", bold: true}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],

                                    // EDUCATION will be pushed here
                                    [{text: "Education ", bold: true, margin: [0, 15, 0, 0]}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    
                                    // SKILLS
                                    [{text: "Skills ", bold: true, margin: [0, 15, 0, 0]}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    
                                                                        // SKILLS
                                    [{text: "Languages ", bold: true, margin: [0, 15, 0, 0]}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                                                        // SKILLS
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {// RIGHT-SIDE: content[1].table.body[0][1].table.body
                            table: {
                                widths: [375],
                                body: [
                                    // WORK experience will be pushed here
                                    [{text: "Professional Experience ", bold: true}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],

                                    // WORK experience will be pushed here
                                    [{text: "Projects", bold: true, margin: [0, 15, 0, 0]}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],
                                    [{text: "-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  ", color: "#afafaf"}],


                                ]
                            },
                            layout: 'noBorders'

                        }]
                    ]
                },
                layout: 'noBorders'
            }
        ]
        
             
    }




    pdfMake.createPdf(docDefinition).download((user.last_name||"LastName") + "_" +(user.name||"Name") + ".pdf");   
    
}

// Adding the User Name
docDefinition.content.unshift(
    [{text: [{text: "Nahom "}, {text: "Gebrehiwot", bold:true}], fontSize: 32, alignment: "center"}]    
)
