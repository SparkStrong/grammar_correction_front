
import $ from "jquery"

export function getConfig() {
    let config;
    $.ajax({
        url: "../../../config.json",
        async: false,
        success: function(data) {config = data;}
    })
    return config;
}