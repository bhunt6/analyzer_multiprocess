//Multiprocess script for JavaScript version of Foma analyzer
//Benjamin Hunt, 7/05/2025
//Foma-based morphological analyzer for St. Lawrence Island Akuzipik - Schwartz et al (2019), Chen & Schwartz (2018), 
//Conversion to Javascript - Hunt et al. (2023), Hunt et al (2019)
//Foma documentation and python script for conversion - Hulden (2008), https://github.com/mhulden/foma/

// @inproceedings{Schwartz:2019a,
//     author    = {Schwartz, Lane and Chen, Emily and Hunt, Benjamin and Schreiner, Sylvia L.R.},
//     title     = {Bootstrapping a Neural Morphological Analyzer for {St.~Lawrence Island Yupik} from a Finite-State Transducer},
//     year      = {2019},
//     booktitle = {Proceedings of the 3rd Workshop on the Use of Computational Methods in the Study of Endangered Languages},
//     publisher = {Association for Computational Linguistics},
//     address   = {Honolulu, Hawaii},
//     pages     = {87--96}
// }

// @inproceedings{chen:2018morphological,
//   title={A morphological analyzer for st. lawrence island/central siberian yupik},
//   author={Chen, Emily and Schwartz, Lane},
//   booktitle={Proceedings of the Eleventh International Conference on Language Resources and Evaluation (LREC 2018)},
//   year={2018}
// }

// @inproceedings{hunt:2023community,
//   title={Community consultation and the development of an online Akuzipik-English dictionary},
//   author={Hunt, Benjamin and Schwartz, Lane and Schreiner, Sylvia and Chen, Emily},
//   booktitle={Proceedings of the Workshop on Natural Language Processing for Indigenous Languages of the Americas (AmericasNLP)},
//   pages={134--143},
//   year={2023}
// }

// @inproceedings{hunt:2019community,
//   title={Community lexical access for an endangered polysynthetic language: An electronic dictionary for St. Lawrence Island Yupik},
//   author={Hunt, Benjamin and Chen, Emily and Schreiner, Sylvia LR and Schwartz, Lane},
//   booktitle={Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics (Demonstrations)},
//   pages={122--126},
//   year={2019}
// }

// @inproceedings{hulden:2009foma,
//   title={Foma: a finite-state compiler and library},
//   author={Hulden, Mans},
//   booktitle={Proceedings of the Demonstrations Session at EACL 2009},
//   pages={29--32},
//   year={2009}
// }

import { foma_apply_down, foma_apply_dn } from './foma_apply_down.js';
//import { m2s } from './m2s.js'; //morpheme to surface
import { s2m } from './s2m.js'; //surface to morpheme
import { readFileSync } from 'fs';

//replace this with your filename
const fileString = "./test_wordlist.txt";
//surface to morpheme analyzer, include m2s and exclude s2m if going the other direction 
const net = s2m;

const parseTest = (word) => {
    let result = foma_apply_down(net, word);
    return condition(result)
}

//replace the internals of this function with whatever condition you are looking for...
//e.g. if the parses contain some morpheme, if they parse unambiguously, if they parse at all, etc.
const condition = (word) => {
    return !(word[0] == null)
}

const readFileLinesSync = path =>
  readFileSync(path, 'UTF8').toString().split(/\r\n|\n/);

const lex = readFileLinesSync(fileString);

for(let i=0; i<lex.length; i++){
    console.log(`${lex[i]} : ${parseTest(lex[i])}`);
}