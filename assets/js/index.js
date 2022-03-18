let lang = localStorage.getItem("lang") || "pt";
let menu_open = false;
let scroll = true;
let details_expanded = false;
let settings_opened = false;
let last_span = null;

const ascii = () => {
    let arr = []
    for( let i = 48; i <= 57; i++ ) arr.push(String.fromCharCode(i));
    for( let i = 65; i <= 90; i++ ) arr.push(String.fromCharCode(i));
    for( let i = 97; i <= 122; i++ ) arr.push(String.fromCharCode(i));
    return arr;
}

const rng = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const show_message = (msg, type) => {
    $("#msg").append($.parseHTML(msg));

    if(type === 0){ $("#msg").css("background-color", "var(--succ)"); }
    else if(type === 1){ $("#msg").css("background-color", "var(--warn)"); }
    else if(type === 2){ $("#msg").css("background-color", "var(--error)"); }
    else if(type === 3){ $("#msg").css("background-color", "var(--info)"); }
    else{ return; }

    $("#msg").css("opacity", "1");
    $("#msg").fadeIn("slow", () => {
        setTimeout(() => {
            $("#msg").fadeOut("slow", () => {
                $("#msg").empty();
                $("#msg").css("opacity", "0");
            })
        }, 1500);
    })
}

const observer = new IntersectionObserver(function(entries) {
	if(entries[0]['intersectionRatio'] == 0) {
        scroll = false;
        $($("#art svg")[9]).css("top", `0px`);
        $($("#art svg")[8]).css("top", `0px`);
        $($("#art svg")[7]).css("top", `0px`);
        $($("#art svg")[6]).css("top", `0px`);
        $($("#art svg")[5]).css("top", `0px`);
        $($("#art svg")[4]).css("top", `0px`);
        $($("#art svg")[3]).css("top", `0px`);
        $($("#art svg")[2]).css("top", `0px`);
        $($("#art svg")[1]).css("top", `0px`);
        $($("#art svg")[0]).css("top", `0px`);
	}
	else { scroll = true; }
}, { root: document.documentElement });

$("#menu").click(() => {
    if(!menu_open){        
        $("body").css("overflow-y", "hidden");
        $(".options").addClass("dropdown");
        $.each($(".opt"), (i, el) => {
            setTimeout(() => {
                $(el).addClass("slide")
            }, 50 * i)
        });
        menu_open = true;
    }
    else{
        $("body").css("overflow-y", "auto");
        $.each($(".opt"), (i, el) => {
            setTimeout(() => {
                $(el).removeClass("slide")
            }, 50 * i)
        });
        setTimeout(() => {
            $(".options").removeClass("dropdown");
        }, 50 * $(".opt").length)
        menu_open = false;
    }
})

$("#settings, .darken").click(() => {
    if(!settings_opened){
        $("body").css("overflow-y", "hidden");
        $("#settings_popup").css("height", "500px").css("visibility", "visible").css("z-index", "8");
        settings_opened = true
        $(".darken").css("height", "100%");
    }
    else{
        $("body").css("overflow-y", "auto");
        $("#settings_popup").css("height", "0px");
        setTimeout(() => {
            $("#settings_popup").css("visibility", "hidden").css("z-index", "-50")
            $(".darken").css("height", "0px");
        }, 150)
        settings_opened = false;
    } 
})

$(".radio").click(function(){
    $($($(".radio")[0]).children()[0]).removeClass("checked");
    $($($(".radio")[1]).children()[0]).removeClass("checked");

    if($(this).attr("data-lang") === "pt"){ 
        localStorage.setItem("lang", "pt");
        lang = "pt";
        load_data();
    }
    else{
        localStorage.setItem("lang", "en");
        lang = "en";
        load_data();
    }
    console.log($(this).attr("data-lang"));

    if(!$($(this).children()).hasClass("checked")){ $($(this).children()).addClass("checked"); }
    else{ $($(this).children()).removeClass("checked"); }
})

const load_data = () => {
    $(".loading").css("z-index", "10");
    $("#details, #intro, #sol, #ts, #cl, #abt_title, #wil_title, #projects_title, #git_text, #more, #more_abt .col .title, #more_abt .col .content, #settings_popup .content .set .title, #proj_container, #age, #mail").empty()
    last_span = null;
    $("#details").removeClass("show");

    $.each($(".options .opt a"), (i, el) => { $(el).empty(); });
    $.getJSON("assets/js/projects.json", (d) => {
        if(lang == "pt"){
            $("#intro").append($.parseHTML(d.front_page.intro.pt));
            $("#sol").append($.parseHTML(d.to_learn.sol.pt));
            $("#ts").append($.parseHTML(d.to_learn.ts.pt));
            $("#cl").append($.parseHTML(d.to_learn.c.pt));
            $("#abt_title").append($.parseHTML(d.topics.about.pt));
            $("#wil_title").append($.parseHTML(d.topics.wil.pt));
            $("#projects_title").append($.parseHTML(d.topics.proj.pt));
            $("#git_text").append($.parseHTML(d.working.pt));
            $("#mail").append($.parseHTML(d.front_page.email.pt));
            $("#more").append($.parseHTML(d.details.text.pt));
            $($("#more_abt .col .title")[0]).append($.parseHTML(d.details.basic.title.pt));
            $($("#more_abt .col .title")[1]).append($.parseHTML(d.details.conf.title.pt));
            $($("#more_abt .col .title")[2]).append($.parseHTML(d.details.advanced.title.pt));
            $($("#more_abt .col .content")[2]).append($.parseHTML(d.details.holder.pt));
            $("#settings_popup .content .set .title").append($.parseHTML(d.settings.language.pt));
            $.each(d.navbar.pt, (i, t) => { $($(".options .opt a")[i]).append($.parseHTML(t)); });
            $("html, #intro, #sol, #ts, #cl, #abt_title, #wil_title, #projects_title, #git_text, #more, #more_abt .col .title, #more_abt .col .content, #settings_popup .content .set .title, #proj_container, #age, #mail").attr("lang", "pt");
        }
        else{
            $("#intro").append($.parseHTML(d.front_page.intro.en));
            $("#sol").append($.parseHTML(d.to_learn.sol.en));
            $("#ts").append($.parseHTML(d.to_learn.ts.en));
            $("#cl").append($.parseHTML(d.to_learn.c.en));
            $("#abt_title").append($.parseHTML(d.topics.about.en));
            $("#wil_title").append($.parseHTML(d.topics.wil.en));
            $("#projects_title").append($.parseHTML(d.topics.proj.en));
            $("#git_text").append($.parseHTML(d.working.en));
            $("#mail").append($.parseHTML(d.front_page.email.en));
            $("#more").append($.parseHTML(d.details.text.en));
            $($("#more_abt .col .title")[0]).append($.parseHTML(d.details.basic.title.en));
            $($("#more_abt .col .title")[1]).append($.parseHTML(d.details.conf.title.en));
            $($("#more_abt .col .title")[2]).append($.parseHTML(d.details.advanced.title.en));
            $($("#more_abt .col .content")[2]).append($.parseHTML(d.details.holder.en));
            $("#settings_popup .content .set .title").append($.parseHTML(d.settings.language.en));
            $.each(d.navbar.en, (i, t) => { $($(".options .opt a")[i]).append($.parseHTML(t)); });
            $("html, #intro, #sol, #ts, #cl, #abt_title, #wil_title, #projects_title, #git_text, #more, #more_abt .col .title, #more_abt .col .content, #settings_popup .content .set .title, #proj_container, #age, #mail").attr("lang", "en");
        }

        const projects = () => {
            for (let i = 0; i < d.projects_details.list.length; i++) {
                let row = document.createElement("div");
                let img = document.createElement("div");
                let project = document.createElement("div");
                let title = document.createElement("div");
                let details = document.createElement("div");
                let techs = document.createElement("div");
                let buttons = document.createElement("div");
                let live = document.createElement("a");
                let source = document.createElement("a");
                let ic1 = document.createElement("i");
                let ic2 = document.createElement("i");
                
                $(title).append($.parseHTML(d.projects_details.list[i].name));
                $(techs).append(d.projects_details.list[i].technologies.join(" / "));
                
                if(lang == "pt"){
                    if(d.projects_details.list[i].url === null) $(live).attr("onclick", "show_message('Não existe um URL disponível para este projeto.', 3)");
                    else $(live).attr("target", "_blank").attr("href", d.projects_details.list[i].url);

                    if(d.projects_details.list[i].source === null) $(source).attr("onclick", "show_message('O código fonte não está disponivel.', 3)");
                    else $(source).attr("target", "_blank").attr("href", d.projects_details.list[i].source);

                    $(details).append($.parseHTML(d.projects_details.list[i].description.pt));
                }
                else{                    
                    if(d.projects_details.list[i].url === null) $(live).attr("onclick", "show_message('No URL available for this project.', 3)");
                    else $(live).attr("target", "_blank").attr("href", d.projects_details.list[i].url);

                    if(d.projects_details.list[i].source === null) $(source).attr("onclick", "show_message('Source code is not available.', 3)");
                    else $(source).attr("target", "_blank").attr("href", d.projects_details.list[i].source);

                    $(details).append($.parseHTML(d.projects_details.list[i].description.en));
                }

                $(row).addClass("row");
                $(img).addClass("img");
                $(project).addClass("project");
                $(title).addClass("title");
                $(details).addClass("details");
                $(techs).addClass("techs");
                $(buttons).addClass("buttons");
                $(live).addClass("live");
                $(source).addClass("source");
                $(ic1).addClass("fa-solid fa-eye");
                $(ic2).addClass("fa-brands fa-github");

                $(live).append(ic1);
                $(source).append(ic2);
                $(buttons).append(live).append(source);
                $(project).append(title).append(details).append(techs)
                $(row).append(img).append(project).append(buttons);

                $("#proj_container").append(row);
            }
        }

        const age = () => {
            if($("#age").length){
                $("#age").text(String(dayjs().diff("2000-06-27", "year", true)).substring(0, 12)); 
            }
            setTimeout(() => ( age() ), 50);
        }

        const last_project = () => {
            $.get("https://api.github.com/users/guuuu/repos", (data) => {
                let aux = new Date();
                let dif_date = Number.MAX_SAFE_INTEGER;
                let aux_index = -1;
                data.forEach((repo, index) => {
                    if(aux - new Date(repo.updated_at) < dif_date){
                        dif_date = aux - new Date(repo.updated_at);
                        aux_index = index;
                    }
                })
                
                $("#git").append(`${data[aux_index].name}`);
                $($("#git").parents()[0]).attr("href", data[aux_index].html_url);
                $($("#git").parents()[0]).attr("target", "_blank");
            })
        }

        const more_details = () => {
            $.each(d.details.basic.content, (i, p) => { $($("#more_abt .col .content")[0]).append($.parseHTML(p)); })
            $.each(d.details.conf.content, (i, p) => { $($("#more_abt .col .content")[1]).append($.parseHTML(p)); })
            $.each(d.details.advanced.content, (i, p) => { $($("#more_abt .col .content")[2]).append($.parseHTML(p)); })
        }

        projects();
        age();
        last_project();
        draw_lines();
        more_details();
        setTimeout(() => { $(".loading").css("z-index", "-10"); }, 700);
    })
}

$(window).on("scroll", () => {
    if(scroll){
        if($(window).width() > 800){
            $($("#art svg")[9]).css("top", `${window.scrollY * 2.0}px`);
            $($("#art svg")[8]).css("top", `${window.scrollY * 0.2}px`);
            $($("#art svg")[7]).css("top", `${window.scrollY * 0.3}px`);
            $($("#art svg")[6]).css("top", `${window.scrollY * 0.4}px`);
            $($("#art svg")[5]).css("top", `${window.scrollY * 0.5}px`);
            $($("#art svg")[4]).css("top", `${window.scrollY * 0.6}px`);
            $($("#art svg")[3]).css("top", `${window.scrollY * 0.7}px`);
            $($("#art svg")[2]).css("top", `${window.scrollY * 0.8}px`);
            $($("#art svg")[1]).css("top", `${window.scrollY * 0.9}px`);
            $($("#art svg")[0]).css("top", `${window.scrollY * 1.1}px`);
        }
    }
});

const draw_lines = () => {
    $('#logo').drawsvg({
        duration: 7000,
        easing: 'linear'
    }).drawsvg("animate");

    $.each($("svg"), (i, svg) => {
        if(i < $("svg").length - 1)
            $(svg).drawsvg({
                duration: 4000,
                easing: "linear"
            }).drawsvg("animate");        
        else return;
    });
}

$("#more").click(() => {
    if(!details_expanded){ details_expanded = true; $.each($("#more_abt").children(), (i, p) => { setTimeout(() => { $(p).addClass("expand"); }, i * 300); }); }
    else{ details_expanded = false; $.each($("#more_abt").children(), (i, p) => { setTimeout(() => { $(p).removeClass("expand"); }, i * 300); }); }
})

$(".opt").click(function() {
    $(".opt").removeClass("active");
    $(this).addClass("active");

    if(!menu_open){
        if($(window).width() <= 800){
            $("body").css("overflow-y", "hidden");
            menu_open = true;
        }
        $(".options").addClass("dropdown");
        $.each($(".opt"), (i, el) => {
            setTimeout(() => {
                $(el).addClass("slide")
            }, 50 * i)
        });
    }
    else{
        if($(window).width() <= 800){
            $("body").css("overflow-y", "auto");
            menu_open = false;
        }
        $.each($(".opt"), (i, el) => {
            setTimeout(() => {
                $(el).removeClass("slide")
            }, 50 * i)
        });
        setTimeout(() => {
            $(".options").removeClass("dropdown");
        }, 50 * $(".opt").length)
    }
});

$(document).ready(() => {
    if(lang === "pt") $($($(".radio")[0]).children()[0]).addClass("checked");
    else $($($(".radio")[1]).children()[0]).addClass("checked");
    $("#art").css("height", $(window).width() * 0.58);
    load_data();
    observer.observe($("#art svg")[0]);
});

$(window).resize(() => {
    $("#art").css("height", $(window).width() * 0.58);
})

$("#abt").on("click", "span", function(){
    if($(this).attr("data-type") === "lang"){
        if(last_span === $(this).attr("data-which")){
            $("#details svg rect").removeClass("animate_border");
            $("#details svg rect").addClass("reverse_animate_border");
            setTimeout(() => {
                $("#details").empty();
                $("#details").removeClass("show");
                last_span = null;
            }, 50);
        }
        else{
            $("#details").children().last().remove();
            $("#details").addClass("show");
            $.getJSON("assets/js/projects.json", (d) => {
                if(lang === "pt"){
                    if($(this).attr("data-which") === "c") $("#details").append($.parseHTML(d.languages.c.intro.pt));
                    else if($(this).attr("data-which") === "node") $("#details").append($.parseHTML(d.languages.node.intro.pt));
                    else if($(this).attr("data-which") === "py") $("#details").append($.parseHTML(d.languages.py.intro.pt));
                    else if($(this).attr("data-which") === "js") $("#details").append($.parseHTML(d.languages.js.intro.pt));
                    else if($(this).attr("data-which") === "others") $("#details").append($.parseHTML(d.languages.others.intro.pt));
                }
                else{
                    if($(this).attr("data-which") === "c") $("#details").append($.parseHTML(d.languages.c.intro.en));
                    else if($(this).attr("data-which") === "node") $("#details").append($.parseHTML(d.languages.node.intro.en));
                    else if($(this).attr("data-which") === "py") $("#details").append($.parseHTML(d.languages.py.intro.en));
                    else if($(this).attr("data-which") === "js") $("#details").append($.parseHTML(d.languages.js.intro.en));
                    else if($(this).attr("data-which") === "others") $("#details").append($.parseHTML(d.languages.others.intro.en));
                }
            });
            if(last_span === null){
                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                $(rect).attr("width", "100%").attr("height", "100%").attr("rx", "70px").attr("ry", "70px");
                $(svg).append(rect);
                $("#details").append(svg);
                setTimeout(() => {
                    $("#details svg rect").addClass("animate_border");
                }, 50);
            }
        }

        last_span = $(this).attr("data-which");
    }
})