function templateSuccess(orderId, products, price, total, direction) {
    let text = `
    <!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                -ms-interpolation-mode: bicubic;
            }

            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
            table {
                border-collapse: collapse !important;
            }
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }

            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            /* MEDIA QUERIES */
            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }
                .mobile-center {
                    text-align: center !important;
                }
            }

            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    <body
        style="
            margin: 0 !important;
            padding: 0 !important;
            background-color: #eeeeee;
        "
        bgcolor="#eeeeee"
    >
        <!-- HIDDEN PREHEADER TEXT -->
        <div
            style="
                display: none;
                font-size: 1px;
                color: #fefefe;
                line-height: 1px;
                font-family: Open Sans, Helvetica, Arial, sans-serif;
                max-height: 0px;
                max-width: 0px;
                opacity: 0;
                overflow: hidden;
            "
        >
            Our store takes care of sending all the products as soon as
            possible.
        </div>

        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td
                    align="center"
                    style="background-color: #eeeeee"
                    bgcolor="#eeeeee"
                >
                    <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                    >
                        <tr>
                            <td
                                align="center"
                                valign="top"
                                style="font-size: 0; padding: 35px"
                                bgcolor="#38A3A5"
                            >
                                <div
                                    style="
                                        display: inline-block;
                                        max-width: 50%;
                                        min-width: 100px;
                                        vertical-align: top;
                                        width: 100%;
                                    "
                                >
                                    <table
                                        align="left"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        style="max-width: 300px"
                                    >
                                        <tr>
                                            <td
                                                align="left"
                                                valign="top"
                                                style="
                                                    font-family: Open Sans,
                                                        Helvetica, Arial,
                                                        sans-serif;
                                                    font-size: 36px;
                                                    font-weight: 800;
                                                    line-height: 48px;
                                                "
                                                class="mobile-center"
                                            >
                                                <h1
                                                    style="
                                                        font-size: 36px;
                                                        font-weight: 800;
                                                        margin: 0;
                                                        color: #ffffff;
                                                    "
                                                >
                                                    Coco Mall 🥥 🥥
                                                </h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div
                                    style="
                                        display: inline-block;
                                        max-width: 50%;
                                        min-width: 100px;
                                        vertical-align: top;
                                        width: 100%;
                                    "
                                    class="mobile-hide"
                                >
                                    <table
                                        align="left"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        style="max-width: 300px"
                                    >
                                        <tr>
                                            <td
                                                align="right"
                                                valign="top"
                                                style="
                                                    font-family: Open Sans,
                                                        Helvetica, Arial,
                                                        sans-serif;
                                                    font-size: 48px;
                                                    font-weight: 400;
                                                    line-height: 48px;
                                                "
                                            >
                                                <table
                                                    cellspacing="0"
                                                    cellpadding="0"
                                                    border="0"
                                                    align="right"
                                                >
                                                    <tr>
                                                        <td
                                                            style="
                                                                font-family: Open
                                                                        Sans,
                                                                    Helvetica,
                                                                    Arial,
                                                                    sans-serif;
                                                                font-size: 18px;
                                                                font-weight: 400;
                                                            "
                                                        ></td>
                                                        <td
                                                            style="
                                                                font-family: Open
                                                                        Sans,
                                                                    Helvetica,
                                                                    Arial,
                                                                    sans-serif;
                                                                font-size: 18px;
                                                                font-weight: 400;
                                                                line-height: 24px;
                                                            "
                                                        ></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                align="center"
                                style="
                                    padding: 35px 35px 20px 35px;
                                    background-color: #ffffff;
                                "
                                bgcolor="#ffffff"
                            >
                                <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 600px"
                                >
                                    <tr>
                                        <td
                                            align="center"
                                            style="
                                                font-family: Open Sans,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 16px;
                                                font-weight: 400;
                                                line-height: 24px;
                                                padding-top: 25px;
                                            "
                                        >
                                            <img
                                                src=" data:image/png;base64,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"
                                                width="175"
                                                height="120"
                                                style="
                                                    display: block;
                                                    border: 0px;
                                                "
                                            /><br />
                                            <h2
                                                style="
                                                    font-size: 30px;
                                                    font-weight: 800;
                                                    line-height: 36px;
                                                    color: #333333;
                                                    margin: 0;
                                                "
                                            >
                                                Thank You For Your Order!
                                            </h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            align="left"
                                            style="
                                                font-family: Open Sans,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 16px;
                                                font-weight: 400;
                                                line-height: 24px;
                                                padding-top: 10px;
                                            "
                                        >
                                            <p
                                                style="
                                                    font-size: 16px;
                                                    font-weight: 400;
                                                    line-height: 24px;
                                                    color: #777777;
                                                "
                                            >
                                                Our store will ship all products
                                                as soon as possible.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            align="left"
                                            style="padding-top: 20px"
                                        >
                                            <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                            >
                                                <tr>
                                                    <td
                                                        width="75%"
                                                        align="left"
                                                        bgcolor="#eeeeee"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 800;
                                                            line-height: 24px;
                                                            padding: 10px;
                                                        "
                                                    >
                                                        Order Confirmation #
                                                    </td>
                                                    <td
                                                        width="25%"
                                                        align="left"
                                                        bgcolor="#eeeeee"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 800;
                                                            line-height: 24px;
                                                            padding: 10px;
                                                        "
                                                    >
                                                        ${orderId}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        width="75%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            line-height: 24px;
                                                            padding: 15px 10px
                                                                5px 10px;
                                                        "
                                                    >
                                                        ${products}
                                                    </td>
                                                    <td
                                                        width="25%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            line-height: 24px;
                                                            padding: 15px 10px
                                                                5px 10px;
                                                        "
                                                    >
                                                        ${price}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        width="75%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            line-height: 24px;
                                                            padding: 5px 10px;
                                                        "
                                                    ></td>
                                                    <td
                                                        width="25%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            line-height: 24px;
                                                            padding: 5px 10px;
                                                        "
                                                    ></td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        width="75%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            line-height: 24px;
                                                            padding: 5px 10px;
                                                        "
                                                    ></td>
                                                    <td
                                                        width="25%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 400;
                                                            line-height: 24px;
                                                            padding: 5px 10px;
                                                        "
                                                    ></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            align="left"
                                            style="padding-top: 20px"
                                        >
                                            <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                            >
                                                <tr>
                                                    <td
                                                        width="75%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 800;
                                                            line-height: 24px;
                                                            padding: 10px;
                                                            border-top: 3px
                                                                solid #eeeeee;
                                                            border-bottom: 3px
                                                                solid #eeeeee;
                                                        "
                                                    >
                                                        TOTAL
                                                    </td>
                                                    <td
                                                        width="25%"
                                                        align="left"
                                                        style="
                                                            font-family: Open
                                                                    Sans,
                                                                Helvetica, Arial,
                                                                sans-serif;
                                                            font-size: 16px;
                                                            font-weight: 800;
                                                            line-height: 24px;
                                                            padding: 10px;
                                                            border-top: 3px
                                                                solid #eeeeee;
                                                            border-bottom: 3px
                                                                solid #eeeeee;
                                                        "
                                                    >
                                                        ${total}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td
                                align="center"
                                height="100%"
                                valign="top"
                                width="100%"
                                style="
                                    padding: 0 35px 35px 35px;
                                    background-color: #ffffff;
                                "
                                bgcolor="#ffffff"
                            >
                                <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 660px"
                                >
                                    <tr>
                                        <td
                                            align="center"
                                            valign="top"
                                            style="font-size: 0"
                                        >
                                            <div
                                                style="
                                                    display: inline-block;
                                                    max-width: 50%;
                                                    min-width: 240px;
                                                    vertical-align: top;
                                                    width: 100%;
                                                "
                                            >
                                                <table
                                                    align="left"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="max-width: 300px"
                                                >
                                                    <tr>
                                                        <td
                                                            align="left"
                                                            valign="top"
                                                            style="
                                                                font-family: Open
                                                                        Sans,
                                                                    Helvetica,
                                                                    Arial,
                                                                    sans-serif;
                                                                font-size: 16px;
                                                                font-weight: 400;
                                                                line-height: 24px;
                                                            "
                                                        >
                                                            <p
                                                                style="
                                                                    font-weight: 800;
                                                                "
                                                            >
                                                                Delivery Address
                                                            </p>
                                                            <p>${direction}</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>

                                            <div
                                                style="
                                                    display: inline-block;
                                                    max-width: 50%;
                                                    min-width: 240px;
                                                    vertical-align: top;
                                                    width: 100%;
                                                "
                                            >
                                                <table
                                                    align="left"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                    style="max-width: 300px"
                                                >
                                                    <tr>
                                                        <td
                                                            align="left"
                                                            valign="top"
                                                            style="
                                                                font-family: Open
                                                                        Sans,
                                                                    Helvetica,
                                                                    Arial,
                                                                    sans-serif;
                                                                font-size: 16px;
                                                                font-weight: 400;
                                                                line-height: 24px;
                                                            "
                                                        >
                                                            <p
                                                                style="
                                                                    font-weight: 800;
                                                                "
                                                            >
                                                                Estimated
                                                                Delivery Date
                                                            </p>
                                                            <p>
                                                                To be confirmed
                                                                by store
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td
                                align="center"
                                style="padding: 35px; background-color: #ffffff"
                                bgcolor="#ffffff"
                            >
                                <table
                                    align="center"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 600px"
                                >
                                    <tr>
                                        <td
                                            align="left"
                                            style="
                                                font-family: Open Sans,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 14px;
                                                font-weight: 400;
                                                line-height: 24px;
                                            "
                                        >
                                            <p
                                                style="
                                                    font-size: 14px;
                                                    font-weight: 400;
                                                    line-height: 20px;
                                                    color: #777777;
                                                "
                                            >
                                                If you didn't create an account
                                                using this email address, please
                                                ignore this email or >.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>

`;
    return text;
}

function templateFailure() {
    let text = `
      <!DOCTYPE html>
      <html>
          <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                  }
                  table,
                  td {
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                  }
                  img {
                      -ms-interpolation-mode: bicubic;
                  }
      
                  /* RESET STYLES */
                  img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                  }
                  table {
                      border-collapse: collapse !important;
                  }
                  body {
                      height: 100% !important;
                      margin: 0 !important;
                      padding: 0 !important;
                      width: 100% !important;
                  }
      
                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                      color: inherit !important;
                      text-decoration: none !important;
                      font-size: inherit !important;
                      font-family: inherit !important;
                      font-weight: inherit !important;
                      line-height: inherit !important;
                  }
      
                  /* MEDIA QUERIES */
                  @media screen and (max-width: 480px) {
                      .mobile-hide {
                          display: none !important;
                      }
                      .mobile-center {
                          text-align: center !important;
                      }
                  }
      
                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                      margin: 0 !important;
                  }
              </style>
          </head>
          <body
              style="
                  margin: 0 !important;
                  padding: 0 !important;
                  background-color: #eeeeee;
              "
              bgcolor="#eeeeee"
          >
              <!-- HIDDEN PREHEADER TEXT -->
              <div
                  style="
                      display: none;
                      font-size: 1px;
                      color: #fefefe;
                      line-height: 1px;
                      font-family: Open Sans, Helvetica, Arial, sans-serif;
                      max-height: 0px;
                      max-width: 0px;
                      opacity: 0;
                      overflow: hidden;
                  "
              >
                  Our store takes care of sending all the products as soon as
                  possible.
              </div>
      
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                      <td
                          align="center"
                          style="background-color: #eeeeee"
                          bgcolor="#eeeeee"
                      >
                          <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="max-width: 600px"
                          >
                              <tr>
                                  <td
                                      align="center"
                                      valign="top"
                                      style="font-size: 0; padding: 35px"
                                      bgcolor="#38A3A5"
                                  >
                                      <div
                                          style="
                                              display: inline-block;
                                              max-width: 50%;
                                              min-width: 100px;
                                              vertical-align: top;
                                              width: 100%;
                                          "
                                      >
                                          <table
                                              align="left"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              style="max-width: 300px"
                                          >
                                              <tr>
                                                  <td
                                                      align="left"
                                                      valign="top"
                                                      style="
                                                          font-family: Open Sans,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                          font-size: 36px;
                                                          font-weight: 800;
                                                          line-height: 48px;
                                                      "
                                                      class="mobile-center"
                                                  >
                                                      <h1
                                                          style="
                                                              font-size: 36px;
                                                              font-weight: 800;
                                                              margin: 0;
                                                              color: #ffffff;
                                                          "
                                                      >
                                                          Coco Mall 🥥 🥥
                                                      </h1>
                                                  </td>
                                              </tr>
                                          </table>
                                      </div>
      
                                      <div
                                          style="
                                              display: inline-block;
                                              max-width: 50%;
                                              min-width: 100px;
                                              vertical-align: top;
                                              width: 100%;
                                          "
                                          class="mobile-hide"
                                      >
                                          <table
                                              align="left"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              style="max-width: 300px"
                                          >
                                              <tr>
                                                  <td
                                                      align="right"
                                                      valign="top"
                                                      style="
                                                          font-family: Open Sans,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                          font-size: 48px;
                                                          font-weight: 400;
                                                          line-height: 48px;
                                                      "
                                                  >
                                                      <table
                                                          cellspacing="0"
                                                          cellpadding="0"
                                                          border="0"
                                                          align="right"
                                                      >
                                                          <tr>
                                                              <td
                                                                  style="
                                                                      font-family: Open
                                                                              Sans,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      font-size: 18px;
                                                                      font-weight: 400;
                                                                  "
                                                              ></td>
                                                              <td
                                                                  style="
                                                                      font-family: Open
                                                                              Sans,
                                                                          Helvetica,
                                                                          Arial,
                                                                          sans-serif;
                                                                      font-size: 18px;
                                                                      font-weight: 400;
                                                                      line-height: 24px;
                                                                  "
                                                              ></td>
                                                          </tr>
                                                      </table>
                                                  </td>
                                              </tr>
                                          </table>
                                      </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td
                                      align="center"
                                      style="
                                          padding: 35px 35px 20px 35px;
                                          background-color: #ffffff;
                                      "
                                      bgcolor="#ffffff"
                                  >
                                      <table
                                          align="center"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          style="max-width: 600px"
                                      >
                                          <tr>
                                              <td
                                                  align="center"
                                                  style="
                                                      font-family: Open Sans,
                                                          Helvetica, Arial, sans-serif;
                                                      font-size: 16px;
                                                      font-weight: 400;
                                                      line-height: 24px;
                                                      padding-top: 25px;
                                                  "
                                              >
                                                  <img
                                                      src=" data:image/png;base64,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"
                                                      width="300"
                                                      height="120"
                                                      style="
                                                          display: block;
                                                          border: 0px;
                                                      "
                                                  /><br />
                                                  <h2
                                                      style="
                                                          font-size: 30px;
                                                          font-weight: 800;
                                                          line-height: 36px;
                                                          color: #333333;
                                                          margin: 0;
                                                      "
                                                  >
                                                      Something wrong, sorry!
                                                  </h2>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td
                                                  align="left"
                                                  style="
                                                      font-family: Open Sans,
                                                          Helvetica, Arial, sans-serif;
                                                      font-size: 16px;
                                                      font-weight: 400;
                                                      line-height: 24px;
                                                      padding-top: 10px;
                                                  "
                                              >
                                                  <p
                                                      style="
                                                          font-size: 16px;
                                                          font-weight: 400;
                                                          line-height: 24px;
                                                          color: #777777;
                                                      "
                                                  >
                                                      we had a problem with your
                                                      transfer, you must repeat your
                                                      purchase or contact your bank.
                                                  </p>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
      
                              <tr>
                                  <td
                                      align="center"
                                      style="padding: 35px; background-color: #ffffff"
                                      bgcolor="#ffffff"
                                  >
                                      <table
                                          align="center"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          style="max-width: 600px"
                                      >
                                          <tr>
                                              <td
                                                  align="left"
                                                  style="
                                                      font-family: Open Sans,
                                                          Helvetica, Arial, sans-serif;
                                                      font-size: 14px;
                                                      font-weight: 400;
                                                      line-height: 24px;
                                                  "
                                              >
                                                  <p
                                                      style="
                                                          font-size: 14px;
                                                          font-weight: 400;
                                                          line-height: 20px;
                                                          color: #777777;
                                                      "
                                                  >
                                                      If you didn't create an account
                                                      using this email address, please
                                                      ignore this email.
                                                  </p>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </body>
      </html>
      
  
  `;
    return text;
}

module.exports = { templateSuccess, templateFailure };
