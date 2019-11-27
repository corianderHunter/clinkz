const buildDispositionHeader = filename => {
  return { "Content-Disposition": `attachment; filename="${filename}"` };
};

export default buildDispositionHeader;
