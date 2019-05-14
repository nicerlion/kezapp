<?php
/**
 * Mail Messages
 */

function mail_message_template_1($params) {

    $title_content = '';
    $text_content = '';
    $button_content = '';

    if (!(isset($params["image"])) or $params["image"] == '') {
        $params["image"] = get_template_directory_uri() . '/img/logo.png';
    }

    if (!(isset($params["color"])) or $params["color"] == '') {
        $params["color"] = '#354389';
    }

    if (isset($params["title"]) and $params["title"] != "") {
        $title_content .= '
            <tr>
                <td width="25"></td>
                <td align="center" bgcolor="#ffffff" style="padding:5px 0 5px 0;color: #231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size: 33px;text-align: center;line-height: 34px;font-weight: 900;">
                    ' . $params["title"] . '
                </td>
                <td width="25"></td>
            </tr>';
    }

    if (isset($params["text"]) and $params["text"] != "") {

        if ($title_content) {
            $text_content .= '
                <tr>
                    <td height="30" style="line-height:0px;font-size:0px"></td>
                    <td height="30" style="line-height:0px;font-size:0px"></td>
                    <td height="30" style="line-height:0px;font-size:0px"></td>
                </tr>';
        }

        $text_content .= '
            <tr>
                <td width="25"></td>
                <td style="color:#231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:14px;text-align:center;line-height:19px;font-weight:300">
                    ' . $params["text"] . '
                </td>
                <td width="25"></td>
            </tr>';
    }

    if ((isset($params["url"]) and $params["url"] != "") and (isset($params["text_button"]) and $params["text_button"] != "")) {
        if ($title_content or $text_content) {
            $button_content .= '
                <tr>
                    <td height="30" style="line-height:0px;font-size:0px"></td>
                    <td height="30" style="line-height:0px;font-size:0px"></td>
                    <td height="30" style="line-height:0px;font-size:0px"></td>
                </tr>';
        }

        $button_content .= '
            <tr>
                <td width="25"></td>
                <td align="center" bgcolor="#ffffff" style="padding:5px 0 5px 0">
                    <a target="_blank" href="' . $params["url"] . '" style="color: #ffffff !important;background-color: #50bdca;font-size: 16px;font-weight: 600;display: inline-block;max-width: 100%;padding: 15px 25px;letter-spacing: 1px;text-transform: uppercase;line-height: normal;text-decoration: none;font-family:Verdana,Helvetica,Arial,sans-serif;border-radius: 5px;height: auto;margin-bottom: 0; -webkit-box-shadow: 0px 2px 10px -2px black; box-shadow: 0px 2px 10px -2px black;">
                        ' . $params["text_button"] . '
                    </a>
                </td>
                <td width="25"></td>
            </tr>';
    }

    $content = '<div style="display: block;position: relative;clear: both;width: 100%;">
                    <div style="display: block;width: 100%;max-width: 600px;margin: auto;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td height="50" style="height: 50px;"></td>
                                </tr>
                                <tr>
                                    <td valign="top" align="center" bgcolor="#354389" style="background-color:' . $params["color"] . '">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                </tr>
                                                <tr>
                                                    <td width="25"></td>
                                                    <td valign="top" align="center">
                                                        <a href="' . home_url() . '" style="text-decoration:none" target="_blank">
                                                            <img src="' . $params["image"] . '" alt="Kezandu" border="0" style="display:block;font-family:Verdana,Helvetica,Arial,sans-serif;font-size: 33px;line-height:42px;font-style:italic;color:#ffffff;max-width: 100%;font-weight:bold;height: auto;width: auto;">
                                                        </a>
                                                    </td>
                                                    <td width="25"></td>
                                                </tr>
                                                <tr>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="width: calc(100% - 2px); border:1px solid #d1d3d4">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                    </tr>
                                                    ' . $title_content . '
                                                    ' . $text_content . '
                                                    ' . $button_content . '
                                                    <tr>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>';

    return $content;
}

function mail_message_template_2($params) {

    $text_content = '';

        $image = get_template_directory_uri() . '/img/logo.png';
        $color = '#354389';

        if (isset($params) and $params != "" and is_array($params)) {
            $cont = 1;
            $styles = '';
            foreach ($params as $key => $value) {
                if ($cont > 1) {
                    $styles = 'border-top: 1px solid #d1d3d4 !important; border-color: #d1d3d4 !important;';
                }
                $text_content .= '
                    <tr>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;background-color: #f5f5f5; ' . $styles . '"></td>
                        <td style="color:#231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:14px;text-align:left;line-height:19px;font-weight:300;padding-top:10px;padding-bottom:10px;background-color: #f5f5f5; ' . $styles . '">
                            ' . $key . '
                        </td>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;border-right: 1px solid #d1d3d4 !important;background-color: #f5f5f5; ' . $styles . '"></td>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;background-color: #ffffff; ' . $styles . '"></td>
                        <td style="color:#231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:14px;text-align:left;line-height:19px;font-weight:300;padding-top:10px;padding-bottom:10px;background-color: #ffffff; ' . $styles . '">
                            ' . $value . '
                        </td>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;background-color: #ffffff; ' . $styles . '"></td>
                    </tr>';
                $cont++;
            }
        }

    $content = '<div style="display: block;position: relative;clear: both;width: 100%;">
                    <div style="display: block;width: 100%;max-width: 600px;margin: auto;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td height="50" style="height: 50px;"></td>
                                </tr>
                                <tr>
                                    <td valign="top" align="center" bgcolor="#354389" style="background-color:' . $color . '">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                </tr>
                                                <tr>
                                                    <td width="15"></td>
                                                    <td valign="top" align="center">
                                                        <a href="' . home_url() . '" style="text-decoration:none" target="_blank">
                                                            <img src="' . $image . '" alt="Kezandu" border="0" style="display:block;font-family:Verdana,Helvetica,Arial,sans-serif;font-size: 33px;line-height:42px;font-style:italic;color:#ffffff;max-width: 100%;font-weight:bold;height: auto;width: auto;">
                                                        </a>
                                                    </td>
                                                    <td width="15"></td>
                                                </tr>
                                                <tr>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="width: calc(100% - 2px); border:1px solid #d1d3d4">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    ' . $text_content . '
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>';

    return $content;
}


function mail_message_template_order($params, $name) {

    $text_content = '';
    $image = get_template_directory_uri() . '/img/logo.png';
    $color = '#354389';
    $text_name = $name ? 'Dear ' . $name : 'Hello';

    if (isset($params) and $params != "" and is_array($params)) {
        $cont = 1;
        $styles = '';
        foreach ($params as $key => $value) {
            if ($cont > 1) {
                $styles = 'border-top: 1px solid #d1d3d4 !important; border-color: #d1d3d4 !important;';
            }
            $text_content .= '
                    <tr>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;background-color: #f5f5f5; ' . $styles . '"></td>
                        <td style="color:#231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:14px;text-align:left;line-height:19px;font-weight:300;padding-top:10px;padding-bottom:10px;background-color: #f5f5f5; ' . $styles . '">
                            ' . $key . '
                        </td>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;border-right: 1px solid #d1d3d4 !important;background-color: #f5f5f5; ' . $styles . '"></td>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;background-color: #ffffff; ' . $styles . '"></td>
                        <td style="color:#231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:14px;text-align:left;line-height:19px;font-weight:300;padding-top:10px;padding-bottom:10px;background-color: #ffffff; ' . $styles . '">
                            ' . $value . '
                        </td>
                        <td width="15" style="padding-top:10px;padding-bottom:10px;background-color: #ffffff; ' . $styles . '"></td>
                    </tr>';
            $cont++;
        }
    }

    $content = '<div style="display:block;clear:both;width:100%">
                    <div style="display:block;width:100%;max-width:600px;margin:auto">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td height="50" style="height:50px"></td>
                                </tr>
                                <tr>
                                    <td valign="top" align="center" bgcolor="#354389" style="background-color:' . $color . '">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                </tr>
                                                <tr>
                                                    <td width="25"></td>
                                                    <td valign="top" align="center">
                                                        <a href="' . home_url() . '" style="text-decoration:none" target="_blank">
                                                            <img src="' . $image . '" alt="Kezandu" border="0" style="display:block;font-family:Verdana,Helvetica,Arial,sans-serif;font-size: 33px;line-height:42px;font-style:italic;color:#ffffff;max-width: 100%;font-weight:bold;height: auto;width: auto;">
                                                        </a>
                                                    </td>
                                                    <td width="25"></td>
                                                </tr>
                                                <tr>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                    <td height="22"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="width:calc(100% - 2px);border:1px solid #d1d3d4">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tbody>
                                                    <tr>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="25"></td>
                                                        <td style="color:#231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:14px;text-align: left;line-height:19px;font-weight:300;">
                                                            <div style="text-transform: capitalize;">' . $text_name . ',</div>
                                                            <br />
                                                            Thanks for the donation you just did. Bellow you will find the information
                                                            related to your donation.</td>
                                                        <td width="25"></td>
                                                    </tr>
                                                    <tr>
                                                        <td height="30" style="line-height:0px;font-size:0px"></td>
                                                        <td height="30" style="line-height:0px;font-size:0px"></td>
                                                        <td height="30" style="line-height:0px;font-size:0px"></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="25"></td>
                                                        <td>
                                                            <div style="width:calc(100% - 2px);border:1px solid #d1d3d4">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tbody>
                                                                        ' . $text_content . '
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                        <td width="25"></td>
                                                    </tr>
                                                    <tr>
                                                        <td height="30" style="line-height:0px;font-size:0px"></td>
                                                        <td height="30" style="line-height:0px;font-size:0px"></td>
                                                        <td height="30" style="line-height:0px;font-size:0px"></td>
                                                    </tr>
                                                    <tr>
                                                        <td width="25"></td>
                                                        <td style="color:#231f20;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:14px;text-align: left;line-height:19px;font-weight:300;">
                                                            Regards,
                                                            <br /><br />
                                                            Kezandu Team</td>
                                                        <td width="25"></td>
                                                    </tr>
                                                    <tr>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                        <td height="76" style="line-height:0px;font-size:0px"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>';

    return $content;
}