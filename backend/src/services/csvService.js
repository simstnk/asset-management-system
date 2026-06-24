const json2csv = (data, headers) => {
  if (!data || data.length === 0) return '';
  const keys = Object.keys(headers);
  const labels = Object.values(headers);
  let csv = labels.join(',') + '\n';
  data.forEach(item => {
    const row = keys.map(key => {
      let val = item[key] !== undefined && item[key] !== null ? item[key] : '';
      if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
        val = '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    });
    csv += row.join(',') + '\n';
  });
  return csv;
};

const csv2json = (csv) => {
  const lines = csv.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length < 2) return null;
  const first = lines[0].replace(/^\uFEFF/, '');
  const headers = first.split(',').map(h => h.trim());
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    if (values.length !== headers.length) continue;
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = values[idx] || ''; });
    result.push(obj);
  }
  return result;
};

module.exports = { json2csv, csv2json };