import Tag
 from "../models/tag";
export default class TagController {

    async list() {
        return await Tag.findAll();
    }

    async one(id: number) {
        return await Tag.findByPk(id);
    }

    async new(name: string) {
        return await Tag.create({ name });
    }

    async update(id: number, name: string) {
        const tag = await Tag.findByPk(id);
        if (tag) {
            tag.name = name;
            await tag.save();
        }
        return tag;
    }

    async remove(id: number) {
        const tag = await Tag.findByPk(id);
        if (tag) {
            await tag.destroy();
        }
        return tag;
    }
}