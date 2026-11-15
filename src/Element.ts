import { Atom } from "./objects/Atom"

export enum Element {
    Hydrogen = 1,
    Helium = 2,
    Lithium = 3,
    Beryllium = 4,
    Boron = 5,
    Carbon = 6,
    Nitrogen = 7,
    Oxygen = 8,
    Fluorine = 9,
    Neon = 10,
    Sodium = 11,
    Magnesium = 12,
    Aluminium = 13,
    Silicon = 14,
    Phosphorus = 15,
    Sulfur = 16,
    Chlorine = 17,
    Argon = 18,
    Potassium = 19,
    Calcium = 20,
    Scandium = 21,
    Titanium = 22,
    Vanadium = 23,
    Chromium = 24,
    Manganese = 25,
    Iron = 26,
    Cobalt = 27,
    Nickel = 28,
    Copper = 29,
    Zinc = 30,
    Gallium = 31,
    Germanium = 32,
    Arsenic = 33,
    Selenium = 34,
    Bromine = 35,
    Krypton = 36,
    Rubidium = 37,
    Strontium = 38,
    Yttrium = 39,
    Zirconium = 40,
    Niobium = 41,
    Molybdenum = 42,
    Technetium = 43,
    Ruthenium = 44,
    Rhodium = 45,
    Palladium = 46,
    Silver = 47,
    Cadmium = 48,
    Indium = 49,
    Tin = 50,
    Antimony = 51,
    Tellurium = 52,
    Iodine = 53,
    Xenon = 54,
    Cesium = 55,
    Barium = 56,
    Lanthanum = 57,
    Cerium = 58,
    Praseodymium = 59,
    Neodymium = 60,
    Promethium = 61,
    Samarium = 62,
    Europium = 63,
    Gadolinium = 64,
    Terbium = 65,
    Dysprosium = 66,
    Holmium = 67,
    Erbium = 68,
    Thulium = 69,
    Ytterbium = 70,
    Lutetium = 71,
    Hafnium = 72,
    Tantalum = 73,
    Tungsten = 74,
    Rhenium = 75,
    Osmium = 76,
    Iridium = 77,
    Platinum = 78,
    Gold = 79,
    Mercury = 80,
    Thallium = 81,
    Lead = 82,
    Bismuth = 83,
    Polonium = 84,
    Astatine = 85,
    Radon = 86,
    Francium = 87,
    Radium = 88,
    Actinium = 89,
    Thorium = 90,
    Protactinium = 91,
    Uranium = 92,
    Neptunium = 93,
    Plutonium = 94,
    Americium = 95,
    Curium = 96,
    Berkelium = 97,
    Californium = 98,
    Einsteinium = 99,
    Fermium = 100,
    Mendelevium = 101,
    Nobelium = 102,
    Lawrencium = 103,
    Rutherfordium = 104,
    Dubnium = 105,
    Seaborgium = 106,
    Bohrium = 107,
    Hassium = 108,
    Meitnerium = 109,
    Darmstadtium = 110,
    Roentgenium = 111,
    Copernicium = 112,
    Nihonium = 113,
    Flerovium = 114,
    Moscovium = 115,
    Livermorium = 116,
    Tennessine = 117,
    Oganesson = 118
}

export const elementRegistry = {
    get: (e: Element) => {
        switch(e) {
            case Element.Hydrogen: return new Atom({ neutron: 0, proton: 1, shells: [1] });
            case Element.Helium: return new Atom({ neutron: 2, proton: 2, shells: [2] });
            case Element.Lithium: return new Atom({ neutron: 4, proton: 3, shells: [2,1] });
            case Element.Beryllium: return new Atom({ neutron: 5, proton: 4, shells: [2,2] });
            case Element.Boron: return new Atom({ neutron: 6, proton: 5, shells: [2,3] });
            case Element.Carbon: return new Atom({ neutron: 6, proton: 6, shells: [2,4] });
            case Element.Nitrogen: return new Atom({ neutron: 7, proton: 7, shells: [2,5] });
            case Element.Oxygen: return new Atom({ neutron: 8, proton: 8, shells: [2,6] });
            case Element.Fluorine: return new Atom({ neutron: 10, proton: 9, shells: [2,7] });
            case Element.Neon: return new Atom({ neutron: 10, proton: 10, shells: [2,8] });
            case Element.Sodium: return new Atom({ neutron: 12, proton: 11, shells: [2,8,1] });
            case Element.Magnesium: return new Atom({ neutron: 12, proton: 12, shells: [2,8,2] });
            case Element.Aluminium: return new Atom({ neutron: 14, proton: 13, shells: [2,8,3] });
            case Element.Silicon: return new Atom({ neutron: 14, proton: 14, shells: [2,8,4] });
            case Element.Phosphorus: return new Atom({ neutron: 16, proton: 15, shells: [2,8,5] });
            case Element.Sulfur: return new Atom({ neutron: 16, proton: 16, shells: [2,8,6] });
            case Element.Chlorine: return new Atom({ neutron: 18, proton: 17, shells: [2,8,7] });
            case Element.Argon: return new Atom({ neutron: 22, proton: 18, shells: [2,8,8] });
            case Element.Potassium: return new Atom({ neutron: 20, proton: 19, shells: [2,8,8,1] });
            case Element.Calcium: return new Atom({ neutron: 20, proton: 20, shells: [2,8,8,2] });
            case Element.Scandium: return new Atom({ neutron: 24, proton: 21, shells: [2,8,9,2] });
            case Element.Titanium: return new Atom({ neutron: 26, proton: 22, shells: [2,8,10,2] });
            case Element.Vanadium: return new Atom({ neutron: 28, proton: 23, shells: [2,8,11,2] });
            case Element.Chromium: return new Atom({ neutron: 28, proton: 24, shells: [2,8,13,1] });
            case Element.Manganese: return new Atom({ neutron: 30, proton: 25, shells: [2,8,13,2] });
            case Element.Iron: return new Atom({ neutron: 30, proton: 26, shells: [2,8,14,2] });
            case Element.Cobalt: return new Atom({ neutron: 32, proton: 27, shells: [2,8,15,2] });
            case Element.Nickel: return new Atom({ neutron: 30, proton: 28, shells: [2,8,16,2] });
            case Element.Copper: return new Atom({ neutron: 34, proton: 29, shells: [2,8,18,1] });
            case Element.Zinc: return new Atom({ neutron: 34, proton: 30, shells: [2,8,18,2] });
            case Element.Gallium: return new Atom({ neutron: 38, proton: 31, shells: [2,8,18,3] });
            case Element.Germanium: return new Atom({ neutron: 42, proton: 32, shells: [2,8,18,4] });
            case Element.Arsenic: return new Atom({ neutron: 42, proton: 33, shells: [2,8,18,5] });
            case Element.Selenium: return new Atom({ neutron: 46, proton: 34, shells: [2,8,18,6] });
            case Element.Bromine: return new Atom({ neutron: 44, proton: 35, shells: [2,8,18,7] });
            case Element.Krypton: return new Atom({ neutron: 48, proton: 36, shells: [2,8,18,8] });
            case Element.Rubidium: return new Atom({ neutron: 48, proton: 37, shells: [2,8,18,8,1] });
            case Element.Strontium: return new Atom({ neutron: 50, proton: 38, shells: [2,8,18,8,2] });
            case Element.Yttrium: return new Atom({ neutron: 50, proton: 39, shells: [2,8,18,9,2] });
            case Element.Zirconium: return new Atom({ neutron: 50, proton: 40, shells: [2,8,18,10,2] });
            case Element.Niobium: return new Atom({ neutron: 52, proton: 41, shells: [2,8,18,12,1] });
            case Element.Molybdenum: return new Atom({ neutron: 56, proton: 42, shells: [2,8,18,13,1] });
            case Element.Technetium: return new Atom({ neutron: 55, proton: 43, shells: [2,8,18,13,2] });
            case Element.Ruthenium: return new Atom({ neutron: 58, proton: 44, shells: [2,8,18,15,1] });
            case Element.Rhodium: return new Atom({ neutron: 58, proton: 45, shells: [2,8,18,16,1] });
            case Element.Palladium: return new Atom({ neutron: 60, proton: 46, shells: [2,8,18,18] });
            case Element.Silver: return new Atom({ neutron: 60, proton: 47, shells: [2,8,18,18,1] });
            case Element.Cadmium: return new Atom({ neutron: 66, proton: 48, shells: [2,8,18,18,2] });
            case Element.Indium: return new Atom({ neutron: 66, proton: 49, shells: [2,8,18,18,3] });
            case Element.Tin: return new Atom({ neutron: 70, proton: 50, shells: [2,8,18,18,4] });
            case Element.Antimony: return new Atom({ neutron: 70, proton: 51, shells: [2,8,18,18,5] });
            case Element.Tellurium: return new Atom({ neutron: 78, proton: 52, shells: [2,8,18,18,6] });
            case Element.Iodine: return new Atom({ neutron: 74, proton: 53, shells: [2,8,18,18,7] });
            case Element.Xenon: return new Atom({ neutron: 78, proton: 54, shells: [2,8,18,18,8] });
            case Element.Cesium: return new Atom({ neutron: 78, proton: 55, shells: [2,8,18,18,8,1] });
            case Element.Barium: return new Atom({ neutron: 82, proton: 56, shells: [2,8,18,18,8,2] });
            case Element.Lanthanum: return new Atom({ neutron: 82, proton: 57, shells: [2,8,18,18,9,2] });
            case Element.Cerium: return new Atom({ neutron: 82, proton: 58, shells: [2,8,18,19,9,2] });
            case Element.Praseodymium: return new Atom({ neutron: 82, proton: 59, shells: [2,8,18,21,8,2] });
            case Element.Neodymium: return new Atom({ neutron: 82, proton: 60, shells: [2,8,18,22,8,2] });
            case Element.Promethium: return new Atom({ neutron: 84, proton: 61, shells: [2,8,18,23,8,2] });
            case Element.Samarium: return new Atom({ neutron: 90, proton: 62, shells: [2,8,18,24,8,2] });
            case Element.Europium: return new Atom({ neutron: 90, proton: 63, shells: [2,8,18,25,8,2] });
            case Element.Gadolinium: return new Atom({ neutron: 94, proton: 64, shells: [2,8,18,25,9,2] });
            case Element.Terbium: return new Atom({ neutron: 94, proton: 65, shells: [2,8,18,27,8,2] });
            case Element.Dysprosium: return new Atom({ neutron: 98, proton: 66, shells: [2,8,18,28,8,2] });
            case Element.Holmium: return new Atom({ neutron: 98, proton: 67, shells: [2,8,18,29,8,2] });
            case Element.Erbium: return new Atom({ neutron: 98, proton: 68, shells: [2,8,18,30,8,2] });
            case Element.Thulium: return new Atom({ neutron: 100, proton: 69, shells: [2,8,18,31,8,2] });
            case Element.Ytterbium: return new Atom({ neutron: 104, proton: 70, shells: [2,8,18,32,8,2] });
            case Element.Lutetium: return new Atom({ neutron: 104, proton: 71, shells: [2,8,18,32,9,2] });
            case Element.Hafnium: return new Atom({ neutron: 108, proton: 72, shells: [2,8,18,32,10,2] });
            case Element.Tantalum: return new Atom({ neutron: 108, proton: 73, shells: [2,8,18,32,11,2] });
            case Element.Tungsten: return new Atom({ neutron: 110, proton: 74, shells: [2,8,18,32,12,2] });
            case Element.Rhenium: return new Atom({ neutron: 112, proton: 75, shells: [2,8,18,32,13,2] });
            case Element.Osmium: return new Atom({ neutron: 116, proton: 76, shells: [2,8,18,32,14,2] });
            case Element.Iridium: return new Atom({ neutron: 116, proton: 77, shells: [2,8,18,32,15,2] });
            case Element.Platinum: return new Atom({ neutron: 117, proton: 78, shells: [2,8,18,32,17,1] });
            case Element.Gold: return new Atom({ neutron: 118, proton: 79, shells: [2,8,18,32,18,1] });
            case Element.Mercury: return new Atom({ neutron: 122, proton: 80, shells: [2,8,18,32,18,2] });
            case Element.Thallium: return new Atom({ neutron: 124, proton: 81, shells: [2,8,18,32,18,3] });
            case Element.Lead: return new Atom({ neutron: 126, proton: 82, shells: [2,8,18,32,18,4] });
            case Element.Bismuth: return new Atom({ neutron: 126, proton: 83, shells: [2,8,18,32,18,5] });
            case Element.Polonium: return new Atom({ neutron: 125, proton: 84, shells: [2,8,18,32,18,6] });
            case Element.Astatine: return new Atom({ neutron: 125, proton: 85, shells: [2,8,18,32,18,7] });
            case Element.Radon: return new Atom({ neutron: 136, proton: 86, shells: [2,8,18,32,18,8] });
            case Element.Francium: return new Atom({ neutron: 136, proton: 87, shells: [2,8,18,32,18,8,1] });
            case Element.Radium: return new Atom({ neutron: 138, proton: 88, shells: [2,8,18,32,18,8,2] });
            case Element.Actinium: return new Atom({ neutron: 138, proton: 89, shells: [2,8,18,32,18,9,2] });
            case Element.Thorium: return new Atom({ neutron: 142, proton: 90, shells: [2,8,18,32,18,10,2] });
            case Element.Protactinium: return new Atom({ neutron: 140, proton: 91, shells: [2,8,18,32,20,9,2] });
            case Element.Uranium: return new Atom({ neutron: 146, proton: 92, shells: [2,8,18,32,21,9,2] });
            case Element.Neptunium: return new Atom({ neutron: 144, proton: 93, shells: [2,8,18,32,22,9,2] });
            case Element.Plutonium: return new Atom({ neutron: 150, proton: 94, shells: [2,8,18,32,24,8,2] });
            case Element.Americium: return new Atom({ neutron: 148, proton: 95, shells: [2,8,18,32,25,8,2] });
            case Element.Curium: return new Atom({ neutron: 151, proton: 96, shells: [2,8,18,32,25,9,2] });
            case Element.Berkelium: return new Atom({ neutron: 150, proton: 97, shells: [2,8,18,32,27,8,2] });
            case Element.Californium: return new Atom({ neutron: 153, proton: 98, shells: [2,8,18,32,28,8,2] });
            case Element.Einsteinium: return new Atom({ neutron: 153, proton: 99, shells: [2,8,18,32,29,8,2] });
            case Element.Fermium: return new Atom({ neutron: 157, proton: 100, shells: [2,8,18,32,30,8,2] });
            case Element.Mendelevium: return new Atom({ neutron: 157, proton: 101, shells: [2,8,18,32,31,8,2] });
            case Element.Nobelium: return new Atom({ neutron: 157, proton: 102, shells: [2,8,18,32,32,8,2] });
            case Element.Lawrencium: return new Atom({ neutron: 163, proton: 103, shells: [2,8,18,32,32,8,3] });
            case Element.Rutherfordium: return new Atom({ neutron: 163, proton: 104, shells: [2,8,18,32,32,10,2] });
            case Element.Dubnium: return new Atom({ neutron: 163, proton: 105, shells: [2,8,18,32,32,11,2] });
            case Element.Seaborgium: return new Atom({ neutron: 163, proton: 106, shells: [2,8,18,32,32,12,2] });
            case Element.Bohrium: return new Atom({ neutron: 163, proton: 107, shells: [2,8,18,32,32,13,2] });
            case Element.Hassium: return new Atom({ neutron: 161, proton: 108, shells: [2,8,18,32,32,14,2] });
            case Element.Meitnerium: return new Atom({ neutron: 169, proton: 109, shells: [2,8,18,32,32,15,2] });
            case Element.Darmstadtium: return new Atom({ neutron: 171, proton: 110, shells: [2,8,18,32,32,16,2] });
            case Element.Roentgenium: return new Atom({ neutron: 171, proton: 111, shells: [2,8,18,32,32,17,2] });
            case Element.Copernicium: return new Atom({ neutron: 173, proton: 112, shells: [2,8,18,32,32,18,2] });
            case Element.Nihonium: return new Atom({ neutron: 173, proton: 113, shells: [2,8,18,32,32,18,3] });
            case Element.Flerovium: return new Atom({ neutron: 175, proton: 114, shells: [2,8,18,32,32,18,4] });
            case Element.Moscovium: return new Atom({ neutron: 175, proton: 115, shells: [2,8,18,32,32,18,5] });
            case Element.Livermorium: return new Atom({ neutron: 177, proton: 116, shells: [2,8,18,32,32,18,6] });
            case Element.Tennessine: return new Atom({ neutron: 177, proton: 117, shells: [2,8,18,32,32,18,7] });
            case Element.Oganesson: return new Atom({ neutron: 176, proton: 118, shells: [2,8,18,32,32,18,8] });
        }
        return new Atom({ neutron: 0, proton: 0, shells: []})
    }
}
