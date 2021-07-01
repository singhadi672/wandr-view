import { videoReducer } from "./video-reducer";

describe("video reducer tests", () => {
  test("should be able to add new video to watch later", () => {
    const initialState = {
      watchLater: [],
      playlist: [],
      videoHistory: [],
      likedVideos: [],
    };

    const action = {
      type: "ADD_TO_WATCH_LATER",
      video: { name: "learn react within 15mins", _id: "1234" },
    };

    const state = videoReducer(initialState, action);
    expect(state).toEqual({
      watchLater: [{ name: "learn react within 15mins", _id: "1234" }],
      playlist: [],
      videoHistory: [],
      likedVideos: [],
    });
  });

  test("should remove video from watch later", () => {
    const initialState = {
      watchLater: [
        { name: "learn react within 15mins", _id: "1234" },
        { name: "express.js in 50mins", _id: "1235" },
      ],
      playlist: [],
      videoHistory: [],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "DELETE_VIDEO_FROM_WATCH_LATER",
      video: { name: "learn react within 15mins", _id: "1234" },
    };

    const state = videoReducer(initialState, action);
    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });

  test("should add video to history when user plays a video", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "ADD_TO_HISTORY",
      video: { name: "express.js in 50mins", _id: "1235" },
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [{ name: "express.js in 50mins", _id: "1235" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });

  test("should clear history when user click 'clear all'", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [
        { name: "explore three.js", _id: "1234" },
        { name: "express.js in 50mins", _id: "1235" },
        { name: "what is redux?", _id: "1236" },
      ],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "CLEAR_HISTORY",
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });

  test("should add video to liked videos when user clicks like button", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [
        { name: "explore three.js", _id: "1234" },
        { name: "express.js in 50mins", _id: "1235" },
        { name: "what is redux?", _id: "1236" },
      ],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "ADD_TO_LIKED_VIDEOS",
      video: { name: "explore three.js", _id: "1234" },
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [
        { name: "explore three.js", _id: "1234" },
        { name: "express.js in 50mins", _id: "1235" },
        { name: "what is redux?", _id: "1236" },
      ],
      likedVideos: [
        { name: "express.js in 50mins", _id: "1235" },
        { name: "explore three.js", _id: "1234" },
      ],
    });
  });

  test("should remove video from liked videos when user clicks like button (if already present)", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [
        { name: "explore three.js", _id: "1234" },
        { name: "express.js in 50mins", _id: "1235" },
      ],
    };

    const action = {
      type: "DELETE_VIDEO_FROM_LIKED_VIDEOS",
      video: { name: "explore three.js", _id: "1234" },
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });

  test("should add new playlist", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "ADD_NEW_PLAYLIST",
      payload: {
        text: "new Playlist",
        playlistID: "1238",
      },
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [
        { playlistName: "new Playlist", _id: "1238", playlistVideos: [] },
      ],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });

  test("should add a video to the playlist", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [
        { playlistName: "new Playlist", _id: "1238", playlistVideos: [] },
      ],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "ADD_VIDEO_TO_PLAYLIST",
      video: { name: "learn mongoDB", _id: "1240" },
      item: "new Playlist",
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [
        {
          playlistName: "new Playlist",
          _id: "1238",
          playlistVideos: [{ name: "learn mongoDB", _id: "1240" }],
        },
      ],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });

  test("should remove video from the selected playlist", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [
        {
          playlistName: "new Playlist",
          _id: "1238",
          playlistVideos: [
            { name: "learn mongoDB", _id: "1240" },
            { name: "explore three.js", _id: "1234" },
          ],
        },
      ],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "REMOVE_VIDEO_FROM_PLAYLIST",
      video: { name: "learn mongoDB", _id: "1240" },
      item: "new Playlist",
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [
        {
          playlistName: "new Playlist",
          _id: "1238",
          playlistVideos: [{ name: "explore three.js", _id: "1234" }],
        },
      ],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });

  test("should delete the selected playlist", () => {
    const initialState = {
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [
        {
          playlistName: "new Playlist",
          _id: "1238",
          playlistVideos: [
            { name: "learn mongoDB", _id: "1240" },
            { name: "explore three.js", _id: "1234" },
          ],
        },
        {
          playlistName: "My Playlist",
          _id: "1241",
          playlistVideos: [
            { name: "learn mongoDB", _id: "1240" },
            { name: "explore three.js", _id: "1234" },
          ],
        },
      ],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    };

    const action = {
      type: "DELETE_PLAYLIST",
      item: "new Playlist",
    };

    const state = videoReducer(initialState, action);

    expect(state).toEqual({
      watchLater: [{ name: "express.js in 50mins", _id: "1235" }],
      playlist: [
        {
          playlistName: "My Playlist",
          _id: "1241",
          playlistVideos: [
            { name: "learn mongoDB", _id: "1240" },
            { name: "explore three.js", _id: "1234" },
          ],
        },
      ],
      videoHistory: [{ name: "explore three.js", _id: "1234" }],
      likedVideos: [{ name: "express.js in 50mins", _id: "1235" }],
    });
  });
});
