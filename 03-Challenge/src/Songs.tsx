//tener canciones y modificarlas.
import { useEffect, useState } from "react";
import LinkedList from "./LinkedList";
import Node from "./Node";

function Songs() {
    const [canciones, setCanciones] = useState([
        { name: 'In the end', time: '3:36', artist: 'Linkin Park' },
        { name: 'Last Night on Earth', time: '3:57', artist: 'Green Day' },
        { name: 'Las Noches', time: '3:46', artist: 'Junior H' },
        { name: 'QWERTY', time: '3:21', artist: 'Linkin Park' },
        {name: 'Billie Jean', time: '4:54', artist: 'Michael Jackson'}
    ]);

    const [linkedList, setLinkedList] = useState<LinkedList>(new LinkedList());

    useEffect(() => {
        const list = new LinkedList()
        canciones.forEach((song) => { list.add(song) });
        setLinkedList(list);
        setCurrentSong(list.head)
    }, [canciones])

    const [currentSong, setCurrentSong] = useState<Node | null>(linkedList.head);
    if (!currentSong) return null

    const nextSong = () => {
        setCurrentSong((prevSong) => {
            if (!prevSong) return linkedList.head;
            return prevSong.next ?? linkedList.head;
        });
    }

    const previousSong = () => {
        setCurrentSong((prevSong) => {
            if (!prevSong || prevSong === linkedList.head) {
                let tail = linkedList.head;
                while (tail?.next) {
                    tail = tail.next
                }
                return tail;
            }

            let current = linkedList.head;
            while (current?.next && current.next !== prevSong) {
                current = current.next
            }

            return current;
        })
    }
    return (
        <div className="player">
            <div className="song-info">
                <div className="song-title">
                  {currentSong.value.name}
                </div>
                <p className="artist-name">
                  {currentSong.value.artist}
                </p>
                <div className="song-time">
                    {currentSong.value.time}
                </div>
            </div>
            <div className="controls">
                <button className="prev" onClick={previousSong}>
                    PREVIOUS
                </button>
                <button className="next" onClick={nextSong}>
                    NEXT
                </button>
            </div>
        </div>
    )
}


export default Songs;