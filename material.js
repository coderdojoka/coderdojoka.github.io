/**
 * Created by me on 23.05.16.
 */

var CodoKa = {
    URL_PREFIX: "", //https://raw.githubusercontent.com/coderdojoka/Materialien/master/Python/
    materialIndex: {
        tags: {},
        level: {},
        categories: []
    },

    init: function () {
        this.$materials = $('#materials');
        this.$viewer = $('#viewer').hide();
        this.$searchResults = $('#search_results').hide();

        this.$search = $('#search');
        this.$searchField = this.$search.find("input").keyup(function () {
            this.search(this.$searchField.val());
        }.bind(this));
        this.$searchResultsList = this.$searchResults.find("> ul");
        this.$viewerContent = this.$viewer.find('#content');
        this.$btnBack = this.$viewer.find('#btn_back').click(function () {
            CodoKa.showMaterials();
        });

        $.getJSON("material_index.json", function (data) {
            CodoKa.materialIndex = data;

            CodoKa._gen_categories(CodoKa.materialIndex.categories, CodoKa.$materials.find(">ul").empty(), 2);
        });
    },

    showMaterials: function () {
        this.$materials.show();
        this.$viewer.hide();
        this.$searchResults.hide();
    },

    showViewer: function (entry) {
        this.$materials.hide();
        this.$searchResults.hide();
        this.$viewer.show();

        this.$viewerContent.empty().append("<span>Lade...</span>");

        $.get(CodoKa.URL_PREFIX + entry.uri).done(function (data) {

            var content = '<h2>' + entry.name + '</h2><div>' + entry.desc + '</div>';
            if (entry.type === "html") {

                content = '<div>' + data + '</div>';
            } else if (entry.type === "code") {
                var html = Prism.highlight(data, Prism.languages.python);
                content += '<pre><code class="language-python">' + html + '</code></pre>';
            }

            this.$viewerContent.empty().append(content);
            //if (entry.type === "code") {
            //$(content).find('pre').each(function () {
            Prism.highlightAll();
            //});
            //}

        }.bind(this)).fail(function () {
            this.$viewerContent.empty().append("<span>Es ist ein Fehler aufgetreten :(</span>");
        }.bind(this));
    },

    _gen_entries: function (entries, $parent, level) {
        for (var i = 0; i < entries.length; i++) {

            var li = document.createElement('li'), $li = $(li);
            (function () {
                var entry = entries[i];
                li.entry = entry;
                $li.addClass("e_res");
                $li.append('<h5 class="e_name">' + entry['name'] + '</h5><div class="e_desc">' + entry['desc'] + '</div>');

                $li.click(function () {
                    console.log(entry);
                    CodoKa.showViewer(entry);
                });
            })();

            $parent.append($li);
        }
    },

    _gen_categories: function (cats, $parent, level) {


        for (var i = 0; i < cats.length; i++) {
            var cat = cats[i];
            var $header = $('<h' + level + '></h' + level + '>').text(cat["name"]);
            var $ele = $('<li class="e_cat"></li>').append($header).append($('<ul></ul>'));

            if (cat.hasOwnProperty("categories")) {
                CodoKa._gen_categories(cat["categories"], $ele.find('ul'), Math.min(4, level + 1));
            } else {
                CodoKa._gen_entries(cat["entries"], $ele.find('ul'));
            }

            $parent.append($ele);
        }
    },


    search: function (query, tag, type, level) {
        var entries = [];//this.materialIndex[lang];
        var results = [];

        query = query.trim().toLowerCase();
        if (query.length == 0) {
            CodoKa.showMaterials();
            return;
        }

        this.$materials.hide();
        this.$viewer.hide();
        this.$searchResults.show();
        this.$searchResultsList.empty();


        var self = this;
        $('.e_name').each(function () {
            if (this.innerHTML.toLowerCase().indexOf(query) > -1) {
                self.$searchResultsList.append($(this).parent().clone(true, true));
            }
        });
        if(this.$searchResultsList.children().length == 0){
            self.$searchResultsList.append("Keine Treffer gefunden :(");
        }
    }
};

$(function () {
    CodoKa.init();
});

