//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

import * as proto from './picture-album-prototypes.js';
import * as lib from './picture-library.js';

const libraryDir = "app-data/library";
const libraryJSON = "picture-library.json";

class pictureLibraryBrowser extends lib.pictureLibrary {

    constructor() {
        super();
    }

    // fetch localstorage
    static async fetch() {
        let data = JSON.parse(window.localStorage.getItem("library"));
            console.log("Fetched data from localStorage:", data); // Lägg till detta
        if (typeof data === "undefined" || data == null || !data) {
            data = await pictureLibraryBrowser.loadFromJson();
        } return data;
    }

    // save in local storage
    static async save(data) {
        console.log("Saving data to localStorage:", data); // Lägg till detta
        window.localStorage.setItem("library", JSON.stringify(data));

    }

    // load data from json on computer
    static async loadFromJson() {
        const data = await pictureLibraryBrowser.fetchJSON(libraryJSON);
            console.log("Loaded data from JSON:", data); // Lägg till detta
        pictureLibraryBrowser.save(data);
        return data;
    }

    static async fetchJSON(file) {
        try {
            const url = `../${libraryDir}/${file}`;
            const response = await fetch(url);
            if (response.status >= 200 && response.status < 400) {

                const library = await response.json();
                console.log("Fetched JSON from URL:", library); // Lägg till detta
                lib.pictureLibrary.attachPrototypes(library);

                return library;

            } else {
                // Handle server error
                // example: INTERNAL SERVER ERROR: 500 error
                console.log(`${response.statusText}: ${response.status} error`);
            }
        } catch (error) {

            alert('Failed to recieved data from server');
            console.log('Failed to recieved data from server');
        }
    }
}

// debugging only
/*
// the syntax (function name () {...})(); means declaration immediately follow by execution. 
// this works with arrow functions as well and then the syntax is (()=>{...})();
// in the async case it becomes: (async () => {.....}());

//It is needed here as pictureLibrary.createFromJSON_Browser is an async method returning a promise, which need to be completed with await. Then the result is returned.
(async () => {
    const library = await pictureLibraryBrowser.fetchJSON(libraryJSON);

    console.group('list all albums and picture ')
    console.log(`\Library have ${library.albums.length} albums(s):`)
    for (const album of library.albums) {
        console.log('--- Album -----\n' + album);

        console.log(`\n${album.pictures.length} picture(s) in album:`)
        for (const picture of album.pictures) {
            console.log('\n' + picture);
        }
        console.log('---------------\n');
    }
    console.groupEnd();
    
})();
*/

export { pictureLibraryBrowser };
