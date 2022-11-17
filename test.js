describe("diff >", () => {
  it("간단한 테스트", () => {
    const a = new JSDOM(`
    <div id="test">
        안녕하세요
    <div>
    `);

    const b = new JSDOM(`
    <div id="test">
        안녕하세요
        <strong>개발자 황준일입니다.</strong>
    <div>
    `);

    expect(diff(a, b)).toBe(true);
  });
});

function diff(a, b) {
  if (a == b) return true;
  else return false;
}
