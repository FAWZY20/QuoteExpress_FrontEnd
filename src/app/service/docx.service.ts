import { Injectable } from '@angular/core';
import { Packer, Document, Paragraph, TextRun, BorderStyle, Table, TableRow, TableCell, WidthType, VerticalAlign, TableAnchorType, RelativeHorizontalPosition, OverlapType, RelativeVerticalPosition, TableLayoutType, TableLayout } from "docx";
import { Devis } from '../modelData/devis';
import { DevisTab } from '../modelData/devisTab';
import jsPDF from 'jspdf';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class DocxService {

  doc: any = (devis: Devis) => {
    return new Document({
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
                text: `Siret : ${devis.siretSociete}`,
                break: 1
              }),
              new TextRun({
                text: `N° TVA : ${devis.tvaSociete}`,
                break: 1
              }),
              new TextRun({
                text: `Tél : ${devis.telSociete}`,
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
                text: `Siret : ${devis.siretClient}`,
                break: 1
              }),
              new TextRun({
                text: `Tél : ${devis.telClient}`,
                break: 1
              }),
            ],
            alignment: "right",
          }),
          new Paragraph({
            children: [
              new TextRun({
                break: 2
              })
            ]
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 1505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        alignment: "center",
                        children: [
                          new TextRun({
                            text: "Date du devis"
                          })
                        ]
                      })
                    ],
                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      bottom: 100,
                      top: 100,
                      left: 70,
                      right: 70
                    },
                    shading: {
                      fill: "#E7E6E6"
                    }
                  }),
                  new TableCell({
                    width: {
                      size: 1505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun(`${devis.dateDevis}`)
                        ]
                      })
                    ],
                    margins: {
                      bottom: 100,
                      top: 100,
                      left: 70,
                      right: 70
                    }
                  })
                ]
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                break: 2
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
                        alignment: "center",
                        children: [
                          new TextRun({
                            text: "Description",
                          })
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
                  this.quantiteCell(devis, "#E7E6E6", "Quantité"),
                  this.uniteCell(devis, "#E7E6E6", "Unité"),
                  new TableCell({
                    width: {
                      size: 4505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        alignment: "center",
                        children: [
                          new TextRun({
                            text: "Prix unitaire HT"
                          })
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
                  this.tvaCell(devis, "#E7E6E6", "Taux TVA"),
                  new TableCell({
                    width: {
                      size: 4505,
                      type: WidthType.DXA,
                    },
                    children: [
                      new Paragraph({
                        alignment: "center",
                        children: [
                          new TextRun({
                            text: "Prix total HT"
                          })
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
                      ],
                      margins: {
                        bottom: 70,
                        top: 70,
                        left: 70,
                        right: 70
                      },
                    }),
                    this.quantiteCell(devis, "#FFFFFF", rst.quantite),
                    this.uniteCell(devis, "#FFFFFF", rst.unite),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: "center",
                          children: [
                            new TextRun(`${rst.prixUnitaire} ${devis.moneyUnite}`)
                          ]
                        })
                      ]
                    }),
                    this.tvaCell(devis, "#FFFFFF", rst.tva),
                    new TableCell({
                      verticalAlign: VerticalAlign.CENTER,
                      children: [
                        new Paragraph({
                          alignment: "center",
                          children: [
                            new TextRun(`${rst.prixTotal} ${devis.moneyUnite}`)
                          ]
                        })
                      ]
                    }),
                  ]
                })
              )
            ]
          }),
          this.infoPlus(devis),
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

  };


  constructor() { }

  generateDocx(doc: Document) {
    Packer.toBlob(doc).then(async blob => {
      // Télécharger le fichier DOCX
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = "Devis.docx";
      console.log("voici le lien " + a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }
  generatePdf(doc: Document) {
    
  }

  infoPlus(devis: Devis): Paragraph {
    if (devis.info == null) {
      return new Paragraph({
        children: [
          new TextRun({
            break: 2
          }),
          new TextRun({
            text: " "
          }),
          new TextRun({
            break: 2
          })
        ]
      })
    } else {
      return new Paragraph({
        children: [
          new TextRun({
            break: 2
          }),
          new TextRun({
            text: `${devis.info}`
          }),
          new TextRun({
            break: 2
          })
        ]
      })
    }
  }


  uniteCell(devis: Devis, color: string, contenu: any): TableCell | any {
    let uniteCell: TableCell | any;
    devis.devisTab.forEach(rst => {
      if (rst.uniteCell == true) {
        uniteCell = new TableCell({
          children: [
            new Paragraph({
              alignment: "center",
              children: [
                new TextRun(`${contenu}`)
              ]
            })
          ],
          width: {
            size: 4505,
            type: WidthType.DXA,
          },
          verticalAlign: VerticalAlign.CENTER,
          margins: {
            bottom: 70,
            top: 70,
            left: 70,
            right: 70
          },
          shading: {
            fill: color
          }
        });
      }
    })
    return uniteCell;
  }

  quantiteCell(devis: Devis, color: string, contenu: any): TableCell | any {
    let uniteCell: TableCell | any;
    devis.devisTab.forEach(rst => {
      if (rst.quantiteCell == true) {
        uniteCell = new TableCell({
          children: [
            new Paragraph({
              alignment: "center",
              children: [
                new TextRun(`${contenu}`)
              ]
            })
          ],
          width: {
            size: 4505,
            type: WidthType.DXA,
          },
          verticalAlign: VerticalAlign.CENTER,
          margins: {
            bottom: 70,
            top: 70,
            left: 70,
            right: 70
          },
          shading: {
            fill: color
          }
        });
      }
    })
    return uniteCell;
  }

  tvaCell(devis: Devis, color: string, contenu: any): TableCell | any {
    let uniteCell: TableCell | any;
    devis.devisTab.forEach(rst => {
      if (rst.tvaCell == true) {
        uniteCell = new TableCell({
          children: [
            new Paragraph({
              alignment: "center",
              children: [
                new TextRun(`${contenu} %`)
              ]
            })
          ],
          width: {
            size: 4505,
            type: WidthType.DXA,
          },
          verticalAlign: VerticalAlign.CENTER,
          margins: {
            bottom: 70,
            top: 70,
            left: 70,
            right: 70
          },
          shading: {
            fill: color
          }
        });
      }
    })
    return uniteCell;
  }




}