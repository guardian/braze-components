import { css } from '@emotion/core';

const barHeight = '48px';

export const styles = {
    modal: css`
        position: absolute;
        top: ${barHeight};
        left: 0;
        width: 100%;
        height: calc(100% - ${barHeight});
    `,
    iframe: css`
        width: 100%;
        height: 100%;
    `,
    buttonRow: css`
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin: 0 15px;
        padding: 8px 0;
        justify-content: space-between;
    `,
    activeButton: css`
        border: 0;
        cursor: pointer;
        position: relative;
        text-align: center;
        text-decoration: none;
        transition: all 150ms ease-out;
        transform: translate3d(0, 0, 0);
        vertical-align: top;
        white-space: nowrap;
        margin: 0;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        background: #fafafa;
        color: #333333;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 1px inset;
        border-radius: 4px;
        padding: 10px 16px;
        display: inline;
        overflow: visible;
    `,
    resultRow: css`
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        margin: 0 15px;
        padding: 8px 0;
    `,
    resultKey: css`
        min-width: 100px;
        font-weight: 700;
        margin-right: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        line-height: 16px;
        box-sizing: border-box;
    `,
    resultValue: css`
        appearance: none;
        border: 0 none;
        box-sizing: inherit;
        display: block;
        margin: 0;
        background: #ffffff;
        padding: 6px 10px;
        font-size: 13px;
        position: relative;
        transition: all 200ms ease-out;
        color: #333333;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 1px inset;
        border-radius: 4px;
        line-height: 20px;
        flex: 1;
        text-align: left;
        overflow: visible;
        height: 52px;
    `,
    inactiveButton: css`
        border: 0;
        cursor: no-drop;
        position: relative;
        text-align: center;
        text-decoration: none;
        transition: all 150ms ease-out;
        transform: translate3d(0, 0, 0);
        vertical-align: top;
        white-space: nowrap;
        margin: 0;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        background: #dddddd;
        color: #aaaaaa;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 1px inset;
        border-radius: 4px;
        border-bottom-style: none;
        padding: 10px 16px;
        display: inline;
        overflow: visible;
        &:focus {
            outline: none !important;
        }
    `,
};
