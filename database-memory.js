export class memory {

    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries()).map((vd) => {
            const id = vd[0]
            const data = vd[1]

            return {
                id,
                ...data
            }
        })
        .filter(video=>{
            if(search){
                return video.title.includes(search)
            }

            return true
        })
    }

    create(video) {
        const videoId = crypto.randomUUID()

        this.#videos.set(videoId, video)
    }

    update(id, video) {
        if (this.#videos.has(id)) {
            const existingVideo = this.#videos.get(id)
            this.#videos.set(id, { ...existingVideo, ...video })
            return true
        }
        return false
    }

    delete(id) {
        this.#videos.delete(id)
    }


}