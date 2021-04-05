

import XLSX from 'xlsx'
import { saveAs } from 'file-saver';






const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

function downloadAsExcel(data) {

    const mapedData = data.map((d)=> {
        const obj = {
            FIO: d.full,
            Passport: d.passport,
            Telefon: d.telefon,
            Jinsi: d.jinsi,
            Viloyat: d.viln,
            Shahar: d.shahn,
            Manzil: d.manzil,
            Bitirgan_yili: d.bitirgan_yili,
            Holati: d.bandlik
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