import cv2
import numpy as np


def minutes():
    img = cv2.imread('timer_hover.png')
    for f in xrange(16):
        i = np.copy(img)
        x = 35 if len(str(f)) < 2 else 0
        cv2.putText(i, str(f), (35 + x, 125), 2, 3, 0, 10)
        top = i[:100, :]
        bot = i[100:, :]
        # cv2.imshow(str(f) + ' top', top)
        # cv2.imshow(str(f) + ' bot', bot)
        cv2.imwrite('timer_{}_top.png'.format(f), top)
        cv2.imwrite('timer_{}_bottom.png'.format(f), bot)
    # cv2.waitKey()


def seconds():
    img = cv2.imread('timer.png')
    img_hover = cv2.imread('timer_hover.png')
    for f in ['00', '15', '30', '45']:
        i = np.copy(img)
        ih = np.copy(img_hover)
        cv2.putText(i, str(f), (35, 125), 2, 3, 0, 10)
        cv2.putText(ih, str(f), (35, 125), 2, 3, 0, 10)
        # top = i[:100, :]
        # bot = i[100:, :]
        # cv2.imshow(str(f) + ' top', top)
        # cv2.imshow(str(f) + ' bot', bot)
        cv2.imwrite('timer_seconds_{}.png'.format(f), i)
        cv2.imwrite('timer_seconds_{}_hover.png'.format(f), ih)
    # cv2.waitKey()


if __name__ == '__main__':
    seconds()
