import { Injectable } from '@angular/core';
import { Packer, Document, Paragraph, TextRun, BorderStyle, Table, TableRow, TableCell, WidthType, VerticalAlign, TableAnchorType, RelativeHorizontalPosition, OverlapType, RelativeVerticalPosition, TableLayoutType, TableLayout } from "docx";
import { Devis } from '../modelData/devis';


@Injectable({
  providedIn: 'root'
})
export class DocxService {

  constructor() { }

  generateDocx(devis: Devis) {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${devis.societe}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.adresseSociete}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.codePostalSociete}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.villeSociete}`,
                break: 1
              }),
              new TextRun({
                text: `Siret:${devis.siretSociete}`,
                break: 1
              }),
              new TextRun({
                text: `N° TVA : ${devis.tvaSociete}`,
                break: 1
              }),
              new TextRun({
                text: `Tél :${devis.telSociete}`,
                break: 1
              }),
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${devis.nomClient}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.adresseClient}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.codePostalClient}`,
                break: 1
              }),
              new TextRun({
                text: `${devis.villeClient}`,
                break: 1
              }),
              new TextRun({
                text: `Siret :${devis.siretClient}`,
                break: 1
              }),
              new TextRun({
                text: `Tél :${devis.telClient}`,
                break: 1
              }),
            ],
            alignment: "right",
          }),
          new Paragraph({
            children:[
              new TextRun({
                break:2
              })
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun("Date du devis")
                        ]
                      })
                    ],
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun(`${devis.dateDevis}`)
                        ]
                      })
                    ],
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    }
                  })
                ]
              })
            ]
          }),
          new Paragraph({
            children:[
              new TextRun({
                break:2
              })
            ]
          }),
          new Table({
            columnWidths: [4505, 4505],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 4505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun("Description")
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    width: {
                      size: 4505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun("Quantité")
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    width: {
                      size: 4505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun("Prix unitaire HT")
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    width: {
                      size: 4505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun("Prix total HT")
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  })
                ]
              }),
              ...devis.devisTab.map(rst =>
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun(rst.titre)
                          ]
                        }),
                        new Paragraph({
                          children: [
                            new TextRun(rst.description)
                          ]
                        })
                      ]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun(`${rst.quantite}`)
                          ]
                        })
                      ]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun(`${rst.prixUnitaire} ${rst.unite}`)
                          ]
                        })
                      ]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun(`${rst.prixTotal} ${rst.unite}`)
                          ]
                        })
                      ]
                    }),
                  ]
                })
              )
            ]
          }),
          new Paragraph({
            children:[
              new TextRun({
                break:2
              }),
              new TextRun({
                text:`${devis.info}`
              }),
              new TextRun({
                break:2
              })
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 2505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        alignment: "center",
                        children: [
                          new TextRun("Total HT")
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    width: {
                      size: 2030,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        indent: {
                          left: 100
                        },
                        children: [
                          new TextRun(`${devis.totalHt} ${devis.moneyUnite}`)
                        ]
                      })
                    ]
                  })
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 2505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        alignment: "center",
                        children: [
                          new TextRun("TVA (" + `${devis.tva}` + "%)")
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    width: {
                      size: 2030,
                      type: WidthType.DXA,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        indent: {
                          left: 100
                        },
                        children: [
                          new TextRun(`${devis.tvaTotal}`)
                        ]
                      })
                    ]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 2505,
                      type: WidthType.DXA,
                    },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({
                        alignment: "center",
                        children: [
                          new TextRun("Total TTC")
                        ]
                      })
                    ],
                    margins: {
                      bottom: 70,
                      top: 70,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    width: {
                      size: 2030,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        indent: {
                          left: 100
                        },
                        children: [
                          new TextRun(`${devis.totalTtc} ${devis.moneyUnite}`)
                        ]
                      })
                    ]
                  })
                ]
              })
            ],
            alignment: 'right',
            width: {
              size: 3535,
              type: WidthType.DXA,
            },
            layout: TableLayoutType.FIXED,
          })
        ]
      }],
    });

    Packer.toBlob(doc).then(blob => {
      // Télécharger le fichier DOCX
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "Devis.docx";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

}