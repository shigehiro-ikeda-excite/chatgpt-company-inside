from enum import Enum


class StatusEnum(str, Enum):
    ok = 'OK'
    ng = 'NG'