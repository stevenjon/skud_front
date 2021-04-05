

import XLSX from 'xlsx'
import { saveAs } from 'file-saver';






const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

function downloadAsExcel(data, vils, shahs, muta) {

    const mapedData = data.map((d)=> {
        const obj = {
            ...d,
            viloyati: vils.filter(m=> m.Id == d.viloyat_idsi).length > 0 ? vils.filter(m=> m.Id == d.viloyat_idsi)[0].nomi: "belgilanmagan",
            shahri: shahs.filter(m=> m.Id == d.shahar_id).length > 0 ? shahs.filter(m=> m.Id == d.shahar_id)[0].nomi: "belgilanmagan",
            lavozimi: muta.filter(m=> m.id == d.lavozimi).length > 0 ?muta.filter(m=> m.id == d.lavozimi)[0].mutaxasis_nomi: "belgilanmagan"
        }
        delete obj.viloyat_idsi
        delete obj.shahar_id
        delete obj.lavozimi
        return obj

    })
    const worksheet = XLSX.utils.json_to_sheet(mapedData);
    const workbook = {
        Sheets: {
            'data': worksheet
        },
        SheetNames: ['data']
    };

    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    saveAsExcel(excelBuffer, 'Bitiruvchilar'); 
}

function saveAsExcel(buffer, filename) {
    const data = new Blob([buffer], {type: EXCEL_TYPE});
    saveAs(data,filename + new Date().getTime()+ EXCEL_EXTENSION)
}

export default downloadAsExcel