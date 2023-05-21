import SockJsClient from 'sockjs-client';

const SOCKET_SERVER = 'http://localhost:5000';

export default class WebSocketConnection {
    static instance;
    wsConnect;
    isWsReady;

    listenerRegistry = {
        close: [],
        message: []
    }

    constructor() {
        this.connect();
    }

    subscribeClose(handler) {
        this.listenerRegistry.close = [...this.listenerRegistry.close, handler];

        return () => {
            this.listenerRegistry.close = this.listenerRegistry.close.filter(h => h !== handler);
        }
    }
    subscribeMessage(handler) {
        this.listenerRegistry.message = [...this.listenerRegistry.message, handler];

        return () => {
            this.listenerRegistry.message = this.listenerRegistry.message.filter(h => h !== handler);
        }
    }

    send(message) {
        if (this.wsConnect) {
            this.wsConnect.send(message);
        }
    }
    close(message) {
        if (this.wsConnect) {
            this.wsConnect.close();
            this.wsConnect = null;
            this.isWsReady = false;
        }
    }

    static getInstance() {
        if (!this.instance) {
            WebSocketConnection.instance = new WebSocketConnection();
        }
        return WebSocketConnection.instance;
    }

    connect() {
        if (!this.wsConnect) {
            const tempWs = SockJsClient(SOCKET_SERVER);

            tempWs.onclose = (ev) => {
                this.listenerRegistry.close.forEach(l => l(ev));
            };

            tempWs.onmessage = (ev) => {
                this.listenerRegistry.message.forEach(l => l(ev));
            };

            this.waitSocketIsReady(tempWs);
        }
    }

    waitSocketIsReady(tempWs) {
        setTimeout(() => {
            if (tempWs.readyState === 1) {
                this.wsConnect = tempWs;
                this.isWsReady = true;
            } else {
                this.waitSocketIsReady(tempWs);
            }
        }, 5)
    }
}