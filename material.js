/**
 * Created by me on 23.05.16.
 */


var CAT_TEMPLATE =
    '<li>' +
    '   <h4 class="e_cat_name">##name##</h4>' +
    '   <ul></ul>' +
    '</li>';

var ENTRY_TEMPLATE =
    '<li class="e_res">' +
    '   <h5 class="e_name">##name##</h5>' +
    '   <div class="e_desc">##desc##</div>' +
    '</li>';

var CodoKa = {
    URL_PREFIX: "https://raw.githubusercontent.com/coderdojoka/Materialien/master/Python/",
    materialIndex: {
        tags: {},
        level: {},
        categories: []
    },

    init: function () {
        this.$results = $('#results');
        this.$viewer = $('#viewer');
        this.$viewerContent = this.$viewer.find('#content');
        this.$btnBack = this.$viewer.find('#btn_back').click(function () {
            CodoKa.showSearch();
        });

        $.getJSON("material_index.json", function (data) {
            CodoKa.materialIndex = data;

            CodoKa._gen_categories(CodoKa.materialIndex.categories, CodoKa.$results.empty());
        });
    },

    showSearch: function (entry) {
        this.$results.show();
        this.$viewer.hide();
    },

    showViewer: function (entry) {
        this.$results.hide();
        this.$viewer.show();

        this.$viewerContent.empty().append("<span>Lade...</span>");

        $.get(CodoKa.URL_PREFIX + entry.uri).done(function (data) {

            var content = '<h4>' + entry.name + '</h4><div>' + entry.desc + '</div>';
            if (entry.type === "html") {

                content = '<div>' + data + '</div>';
            }
            else if (entry.type === "code") {
                var html = Prism.highlight(data, Prism.languages.python);
                content += '<pre><code class="language-python">' + html + '</code></pre>';
            }

            this.$viewerContent.empty().append(content);
            if(entry.type === "code"){
                Prism.highlight($(content).find('code')[0]);
            }

        }.bind(this)).fail(function () {
            this.$viewerContent.empty().append("<span>Es ist ein Fehler aufgetreten :(</span>");
        }.bind(this));
    },

    _gen_entries: function (entries, $parent) {
        for (var i = 0; i < entries.length; i++) {

            var text = "";
            var ent = ENTRY_TEMPLATE.replace('##name##', entries[i]['name']);
            text += ent.replace('##desc##', entries[i]['desc']);

            var $ele = $(text);
            (function () {
                var entry = entries[i];

                $ele.click(function () {
                    console.log(entry);
                    CodoKa.showViewer(entry);
                });
            })();

            $parent.append($ele);
        }


    },

    _gen_categories: function (cats, $parent) {


        for (var i = 0; i < cats.length; i++) {
            var content, cat = cats[i];
            var $tmp = $(CAT_TEMPLATE.replace("##name##", cat["name"]));

            if (cat.hasOwnProperty("categories")) {
                content = CodoKa._gen_categories(cat["categories"], $tmp.find('ul'));

            } else {
                content = CodoKa._gen_entries(cat["entries"], $tmp.find('ul'));
            }

            $parent.append($tmp);
        }
    },


    search: function (lang, query, tag, type, level) {
        var entries = this.materialIndex[lang];
        var results = [];

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if ((tag && entry.tag != tag ) || (type && entry.type != type ) ||
                (level && entry.level != level)) {
                continue;
            }

            query = query.trim();
            if (query == "" || CodoKa._text_search(entry.name, query))
                results.push(entry);
        }
    }
    ,

    _text_search: function () {
        return true;
    }
};

$(function () {
    "use strict";

    CodoKa.init();


});