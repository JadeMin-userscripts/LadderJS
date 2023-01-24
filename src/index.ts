import {
	Listeners, OnceCallback,
	Events, StartEvents, EndEvents,
} from "./types.js";


window.Ladder = class LadderJS {
	private listeners: Listeners = {
		startHead: [],
		endHead: [],
		startBody: [],
		endBody: []
	};

	public once(eventName: Events, callback: OnceCallback): void {
		switch(eventName) {
			case StartEvents.head: {
				this.listeners.startHead.push(callback); break;
			};
			case EndEvents.head: {
				//this.listeners.endHead.push(callback); break;
			};
			case StartEvents.body: {
				this.listeners.startBody.push(callback); break;
			};
			case EndEvents.body: {
				this.listeners.endBody.push(callback); break;
			};
			default: {
				console.warn(`Ignoring invalid event: "${eventName}"`); break;
			};
		};
	};
	public setup(): void {
		const headMO: MutationObserver = new MutationObserver((event: MutationRecord[]) => {
			if(document.head) {
				//this.#listeners.once.endHead.forEach(c=>c());
				this.listeners.startHead.forEach(c=>c());
				headMO.disconnect();
			}
		});
		const bodyMO: MutationObserver = new MutationObserver((event: MutationRecord[]) => {
			if(document.body) {
				document.addEventListener("DOMContentLoaded", ()=> this.listeners.endBody.forEach(c=>c()));

				this.listeners.startBody.forEach(c=>c());
				bodyMO.disconnect();
			}
		});
		headMO.observe(document, <MutationObserverInit>{
			childList: true,
			subtree: true
		});
		bodyMO.observe(document, <MutationObserverInit>{
			childList: true,
			subtree: true
		});
	};
};