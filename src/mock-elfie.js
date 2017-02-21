class MockElfie {
    connect() {
        return Promise.resolve('connected');
    }

    start() {
        return this.connect();
    }

    writeColors(r, g, b) {
        console.log(`%c Wrote Color`, `background: rgb(${r}, ${g}, ${b}); padding: 40px; color: white`);
    }
}