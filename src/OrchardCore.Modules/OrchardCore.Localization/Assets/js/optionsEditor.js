function initializeOptionsEditor(elem, data, defaultValue, selectedCulture) {

    var previouslyChecked;

    var store = {
        debug: false,
        state: {
            options: data,
            selected: defaultValue,
            culture: selectedCulture
        },
        addCulture: function () {
            if (this.debug) { console.log('add culture triggered'); }
            var exist = this.state.options.includes(this.state.culture);
            if (!exist) {
                this.state.options.push(this.state.culture);
            }
        },
        removeOption: function (index) {
            if (this.debug) { console.log('remove option triggered with', index); }
            this.state.options.splice(index, 1);
        }
    };

    var optionsTable = {
        template: '#options-table',
        props: ['data'],
        name: 'options-table',
        methods: {
            add: function () {
                store.addCulture(/* the one in the ddl */);
            },
            remove: function (index) {
                store.removeOption(index);
            },
            uncheck: function (index) {
                if (index === previouslyChecked) {
                    $('#customRadio_' + index)[0].checked = false;
                    store.state.selected = null;
                    previouslyChecked = null;
                }
                else {
                    previouslyChecked = index;
                }
            },
            getSupportedCultures: function () {
                return JSON.stringify(store.state.options);
            },
            getDefaultCulture: function () {
                return store.state.selected;
            }
        }
    };

    new Vue({
        components: {
            optionsTable: optionsTable
        },
        data: {
            sharedState: store.state
        },
        el: elem
    });

}

function IsNullOrWhiteSpace(str) {
    return str === null || str.match(/^ *$/) !== null;
}
