function AccordionBlock(runtime, element, data) {
  (async () => {
    const {renderBlock} = await import(data.url);
    renderBlock(element, data);
  })();
}
