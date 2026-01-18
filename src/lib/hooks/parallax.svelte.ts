import { untrack } from "svelte";

export class ParallaxController {
    element = $state<HTMLElement>();
    y = $state(0);
    opacity = $state(1);
    margin = $state(0);

    #frameRequested = false;
    #inView = $state(false);
    #prefersReducedMotion = $state(false);

    constructor(margin = 8) {
        this.margin = margin;

        $effect(() => {
            const query = window.matchMedia("(prefers-reduced-motion: reduce)");
            this.#prefersReducedMotion = query.matches;

            const onChange = () => {
                this.#prefersReducedMotion = query.matches;
            };

            query.addEventListener("change", onChange);
            return () => query.removeEventListener("change", onChange);
        });

        $effect(() => {
            const e = this.element;
            if (!e) return;

            const observer = new IntersectionObserver(this.#onIntersect, {
                threshold: 0,
                rootMargin: "100px",
            });
            observer.observe(e);

            return () => observer.unobserve(e);
        });

        $effect(() => {
            if (!this.#inView || this.#prefersReducedMotion) return;

            window.addEventListener("scroll", this.#onScroll, { passive: true });
            return () => window.removeEventListener("scroll", this.#onScroll);
        });

        $effect(() => {
            if (this.#prefersReducedMotion) {
                this.y = 0;
                this.opacity = 1;
            } else if (this.#inView) {
                this.#tick();
            }
        });
    }

    #onIntersect = (entries: IntersectionObserverEntry[]) => {
        this.#inView = entries[0].isIntersecting;
        if (this.#inView) {
            this.#tick();
        }
    };

    #onScroll = () => {
        if (this.#frameRequested) return;
        this.#frameRequested = true;
        requestAnimationFrame(this.#tick);
    };

    #tick = () => {
        this.#frameRequested = false;
        const e = untrack(() => this.element);
        if (!e) return;

        const rect = e.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        const elementCenter = rect.top + rect.height / 2;
        const windowCenter = windowHeight / 2;
        const distFromCenter = elementCenter - windowCenter;
        const maxDist = windowHeight / 2 + rect.height / 2;
        const progress = distFromCenter / maxDist;

        let newY = -progress * this.margin;
        newY = Math.max(-this.margin, Math.min(this.margin, newY));

        this.y = newY;

        const absProgress = Math.abs(progress);
        let newOpacity = 1 - absProgress * 0.5;
        this.opacity = Math.max(0.5, Math.min(1, newOpacity));
    };
}
