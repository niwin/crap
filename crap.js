<!DOCTYPE html>
<html>
    <head>
        <title>d ver: 1.0</title>
        <style type="text/css">
            .panel {
                margin: 20px 0;
            }

            .press {
                margin-bottom: 10px;
                width: 100px;
            }

            .d_sum span,
            .r_max,
            .r_avg {
                margin-right: 10px;
            }

            .result table,
            .result table tr td {
                border: 1px solid #000;
            }

            .result table {
                border-collapse: collapse;
                text-align: center;
                width: 1200px;
            }

        </style>
        <script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>
    </head>

    <body>
        <div class="panel">
            <div class="control">
                <button class="press"> - p - </button>
            </div>
            <div class="data">
                R number: <input class="g_counter" type="text" value="1000" style="width: 40px;"/> See results: <input type="checkbox" class="see_result"/> See console: <input type="checkbox" class="see_console"/>
            </div>
        </div>
        <div class="result">
            <table>
                <tr>
                    <td colspan="9">D Summary:</td>
                </tr>
                <tr>
                    <td>R Max</td>
                    <td>R AVG</td>
                    <td>G TOTAL</td>
                    <td>Above 0</td>
                    <td>Above 10</td>
                    <td>Above 20</td>
                    <td>Above 30</td>
                    <td>Above 40</td>
                    <td>Above 50</td>
                </tr>
                <tr>
                    <td class="r_max">&nbsp;</td>
                    <td class="r_avg">&nbsp;</td>
                    <td class="g_total">&nbsp;</td>
                    <td class="above_0">&nbsp;</td>
                    <td class="above_10">&nbsp;</td>
                    <td class="above_20">&nbsp;</td>
                    <td class="above_30">&nbsp;</td>
                    <td class="above_40">&nbsp;</td>
                    <td class="above_50">&nbsp;</td>
                </tr>
            </table>
            <div class="d_sum"></div>
        </div>


        <script>

            var DS = DS || {};

            DS.D1;
            DS.D2;
            DS.BK = 1000000;
            DS.RLING_COUNTER = 0;
            DS.RLING_MAX = 0;
            DS.G_TOTAL = 0;
            DS.ABOVE_0 = 0;
            DS.ABOVE_10 = 0;
            DS.ABOVE_20 = 0;
            DS.ABOVE_30 = 0;
            DS.ABOVE_40 = 0;
            DS.ABOVE_50 = 0;
            DS.SEE_RESULT = false;
            DS.SEE_CONSOLE = false;

            // PL
            DS.PL_R = function (num) {
                // PL Starts
                if (DS.SEE_CONSOLE) console.log("G" + num + " - PL_R starts ...");

                // PLING
                DS.RLING(num);

                DS.RLING_COUNTER++;

                // Reset PL value
                if (DS.IS_NUM(DS.G_RESULT)) {
                    DS.PL = false;
                    DS.GO = false;
                }
                if (DS.SEE_CONSOLE) console.log("G" + num + " - PL_R result: " + DS.G_RESULT);
            }

            //RL
            DS.RL_R = function (num) {
                // RL Starts
                if (DS.SEE_CONSOLE) console.log("G" + num + " - RL starts ...");
                // PLING
                DS.RLING(num);

                if (DS.SEE_CONSOLE) console.log("G" + num + " - RL result: " + DS.G_RESULT);
                if ((DS.G_RESULT == 7) || (DS.G_RESULT == DS.CURRENT_PT)){
                    DS.GO = true;
                    DS.PL = true;

                    //DS.RESET();
                    if (DS.G_RESULT == DS.CURRENT_PT) {
                        DS.CURRENT_PT
                        if (DS.SEE_CONSOLE) console.log("************* GW! - " + DS.CURRENT_PT + " **************");
                    } else {
                        if (DS.SEE_CONSOLE) console.log("************* GO! - 7 DS.RLING_COUNTER  = " + DS.RLING_COUNTER  + " **************");

                        if (DS.RLING_COUNTER > 50) {
                            DS.ABOVE_50++;
                        } else if (DS.RLING_COUNTER > 40) {
                            DS.ABOVE_40++;
                        } else if (DS.RLING_COUNTER > 30) {
                            DS.ABOVE_30++;
                        } else if (DS.RLING_COUNTER > 20) {
                            DS.ABOVE_20++;
                        } else if (DS.RLING_COUNTER > 10) {
                            DS.ABOVE_10++;
                        } else if (DS.RLING_COUNTER > 0) {
                            DS.ABOVE_0++;
                        }

                        if (DS.RLING_COUNTER > DS.RLING_MAX) {
                            DS.RLING_MAX = DS.RLING_COUNTER;
                            $(".r_max").html(DS.RLING_MAX);
                        }
                        DS.RLING_COUNTER = 0;

                        DS.G_TOTAL++;
                    }
                } else {
                    DS.RLING_COUNTER++;
                }
            }

            //RlING
            DS.RLING = function (num) {
                // RLING Starts
                if (DS.SEE_CONSOLE) console.log("G" + num + " - RLING starts ...");
                DS.D1 = Math.floor(Math.random() * DS.D_VALUE) + 1;
                DS.D2 = Math.floor(Math.random() * DS.D_VALUE) + 1;

                if (DS.SEE_CONSOLE) console.log("D1 = " + DS.D1 + "; D2 = " + DS.D2);
                DS.G_RESULT = DS.D1 + DS.D2;

                if (DS.SEE_RESULT) {
                    if (!DS.GO && DS.G_RESULT == 7) {
                        $(".d_sum").append("<span style='color:red;'>" + "R" + num + ": " + DS.G_RESULT + "</span>");
                    } else {
                        $(".d_sum").append("<span>" + "R" + num + ": " + DS.G_RESULT + "</span>");
                    }
                }
                
            }

            // Check whether a number
            DS.IS_NUM = function (num) {
                if (num > 3 && num < 11) {
                    if (num != 7) {
                        return true;
                    }
                }
            }

            // Reset
            DS.RESET = function () {
                if (DS.SEE_CONSOLE) console.log("RESETING ...");
                DS.D_VALUE = 6;
                DS.B_UNIT = 10;
                DS.T_MAX = 500;
                DS.G_COUNTER = 1;
                DS.G_RESULT = null;
                DS.CURRENT_PT = null;
                DS.PL = true;
                DS.GO = false;
            }

            $(document).ready( function () {
                // Initializing ...
                DS.RESET();

                $(".see_result").on("click", function () {
                    DS.SEE_RESULT = $(this).is(":checked");
                    //console.log("DS.SEE_RESULT: " + DS.SEE_RESULT);
                });

                $(".see_console").on("click", function () {
                    DS.SEE_CONSOLE = $(this).is(":checked");
                    //console.log("DS.SEE_CONSOLE: " + DS.SEE_CONSOLE);
                });

                $(".press").on("click", function () {
                    var i, sum;

                    DS.G_COUNTER = $(".g_counter").val()*1;

                    for (i = 1; i <= DS.G_COUNTER; i++) {
                        // Check whether it is PL.

                        if (DS.SEE_CONSOLE) console.log("DS.PL - " + DS.PL + "; DS.GO - " + DS.GO);
                        if (DS.PL) {
                            DS.PL_R(i);
                        } else if (!DS.GO) {
                            DS.RL_R(i);
                        } else {
                            if (DS.SEE_CONSOLE) console.log("Error!");
                        }
                    }

                    //console.log(DS.ABOVE_0,DS.G_COUNTER)
                    $(".g_total").html(DS.G_TOTAL);
                    $(".r_avg").html(parseInt(DS.G_COUNTER/DS.G_TOTAL));
                    $(".above_0").html(DS.ABOVE_0 + " (" + ((DS.ABOVE_0/DS.G_TOTAL)*100).toFixed(3) +"%)");
                    $(".above_10").html(DS.ABOVE_10 + " (" + ((DS.ABOVE_10/DS.G_TOTAL)*100).toFixed(3) +"%)");
                    $(".above_20").html(DS.ABOVE_20 + " (" + ((DS.ABOVE_20/DS.G_TOTAL)*100).toFixed(3) +"%)");
                    $(".above_30").html(DS.ABOVE_30 + " (" + ((DS.ABOVE_30/DS.G_TOTAL)*100).toFixed(3) +"%)");
                    $(".above_40").html(DS.ABOVE_40 + " (" + ((DS.ABOVE_40/DS.G_TOTAL)*100).toFixed(3) +"%)");
                    $(".above_50").html(DS.ABOVE_50 + " (" + ((DS.ABOVE_50/DS.G_TOTAL)*100).toFixed(3) +"%)");
                })
            });
        </script>
    </body>
</html>
