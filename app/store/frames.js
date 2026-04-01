import { defineStore } from 'pinia'

export const useFrameStore = defineStore('alerts', {

    state: () => ({
        superDots: {},
        isDrawingLayerSelected: true,
        isMotionLayerSelected: false,
        isFrameLayerSelected: false,
        animatingOn: 1,
        baseFps: 24,
        sprite: null,
        spriteScalePercent: 100,
        onionSkinSize: 1,
        currentFrameInPreview: 0,
        chosenSuperPoint: null,
    }),

    actions: {
        addSuperDot(index, dot) {
            this.superDots = {
                ...this.superDots,
                [index]: dot
            }
        }
    }
})