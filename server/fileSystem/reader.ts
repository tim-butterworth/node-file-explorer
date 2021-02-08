import fs from "fs";

const getFiles = (path: string): Promise<string[]> => new Promise((resolve, reject) => {
    fs.readdir(path, (error, files: string[]) => {
        if (error) {
            reject(error)
        } else {
            resolve(files)
        }
    })
})
const isDirectory = (maybeDir: string): Promise<boolean> => new Promise((resolve, reject) => {
    fs.lstat(maybeDir, (error, stats) => {
        if (error) {
            reject(error)
        } else {
            resolve(stats.isDirectory())
        }
    })
})

const toFullFile = (path: string, files: string[]) => {
    return files.map((file) => `${path}/${file}`)
}

const extractFilesRecur = ({ stack, result }: { stack: string[], result: string[] }): Promise<string[]> => {
    if (stack.length === 0) {
        return Promise.resolve(result);
    } else {
        const [file, ...remain] = stack;
        return isDirectory(file)
            .then((directory) => {
                if (directory) {
                    return getFiles(file).then((files) => extractFilesRecur({ stack: [...remain, ...toFullFile(file, files)], result }))
                } else {
                    return extractFilesRecur({ stack: remain, result: [file, ...result] })
                }
            })
    }
}

const extractFiles = (rootDirectory: string): Promise<string[]> => {
    return extractFilesRecur({ stack: [rootDirectory], result: [] })
}

export {
    extractFiles
}