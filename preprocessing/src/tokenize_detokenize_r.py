#tokenize() and detokenize() for R language
#Gayathri Ganesh

import argparse
import logging
import os
import random
import re
import sys
import tokenize
from io import BytesIO

import clang
#import preprocessing.src.javalang_tokenizer as javalang_tok
from clang.cindex import TokenKind
from preprocessing.src.timeout import timeout, TimeoutError
from sacrebleu.tokenizers import TokenizerV14International

TOK_NO_SPACE_BEFORE = {',', ';'}
#clang.cindex.Config.set_library_path('/usr/lib/llvm-7/lib/')
STRINGS_AND_COMMENTS_TOKEN_KINDS = {TokenKind.LITERAL, TokenKind.COMMENT}
logging.basicConfig(
    filename='timeout_r_tokenizer_examples.log', level=logging.DEBUG)

idx = clang.cindex.Index.create()

TOK_NO_SPACE_BEFORE = {',', ';'}
STRINGS_AND_COMMENTS_TOKEN_KINDS = {TokenKind.LITERAL, TokenKind.COMMENT}

R_TOKEN2CHAR = PYTHON_TOKEN2CHAR.copy()
R_CHAR2TOKEN = PYTHON_CHAR2TOKEN.copy()

PYTHON_TOKEN2CHAR = {'STOKEN0': '#',
                     'STOKEN1': "\\n",
                     'STOKEN2': '"""',
                     'STOKEN3': "'''"
                     }

PYTHON_CHAR2TOKEN = {'#': ' STOKEN0 ',
                     "\\n": ' STOKEN1 ',
                     '"""': ' STOKEN2 ',
                     "'''": ' STOKEN3 '
                     }


class ind_iter(object):
    def __init__(self, len):
        self.i = 0
        self.len = len

    def next(self):
        self.i += 1
        if self.i > (self.len - 1):
            raise StopIteration

    def prev(self):
        self.i -= 1
        if self.i < 0:
            raise StopIteration


def process_string(tok, char2tok, tok2char, is_comment):
    if is_comment:
        tok = re.sub(' +', ' ', tok)
        tok = re.sub(r"(.)\1\1\1\1+", r"\1\1\1\1\1", tok)
        if len(re.sub(r'\W', '', tok)) < 2:
                return ''
    tok = tok.replace(' ', ' ▁ ')
    for char, special_token in char2tok.items():
        tok = tok.replace(char, special_token)
    if tok.startswith(' STOKEN0'):
        if tok.endswith('\n'):
            tok = tok[:-1]
        tok += ' ENDCOM'
    tok = tok.replace('\n', ' STRNEWLINE ')
    tok = tok.replace('\t', ' TABSYMBOL ')
    tok = re.sub(' +', ' ', tok)
    tok = TokenizerV14International(tok)
    tok = re.sub(' +', ' ', tok)
    for special_token, char in tok2char.items():
        tok = tok.replace(special_token, char)
    tok = tok.replace('\r', '')

    return tok

def get_r_tokens_and_types(s):
    #code for getting tokens and types

def tokenize_R(s, keep_comments=False):
    tokens = []
    assert isinstance(s, str)
    try:
        tokens_and_types = get_r_tokens_and_types(s)
        for tok, typ in tokens_and_types:
            if not keep_comments and typ == TokenKind.COMMENT:
                continue
            if typ in STRINGS_AND_COMMENTS_TOKEN_KINDS:
                if typ == TokenKind.COMMENT:
                    com = process_string(
                        tok, R_CHAR2TOKEN, R_TOKEN2CHAR, True)
                    if len(com) > 0:
                        tokens.append(com)
                else:
                    tokens.append(process_string(
                        tok, R_CHAR2TOKEN, R_TOKEN2CHAR, False))
            else:
                tokens.append(tok)
        return tokens
    except KeyboardInterrupt:
        raise
    except TimeoutError:
        print(f'TimeOut Error')
        logging.info('*' * 20)
        logging.info(f'TimeOut Error for string {s}')
        return []
    except:
        return []
    
def detokenize_R(s):
    assert isinstance(s, str) or isinstance(s, list)
    if isinstance(s, list):
        s = ' '.join(s)
    s = s.replace('ENDCOM', '\n').replace('▁', ' SPACETOKEN ')
    try:
        tokens_and_types = get_r_tokens_and_types(s)
    except:
        return ''
    new_tokens = []
    i = 0
    while i < len(tokens_and_types):
        token, type = tokens_and_types[i]
        if type in STRINGS_AND_COMMENTS_TOKEN_KINDS:
            new_tokens.append(token.replace('STRNEWLINE', '\n').replace(
                'TABSYMBOL', '\t').replace(' ', '').replace('SPACETOKEN', ' '))
            if type == TokenKind.COMMENT:
                new_tokens.append('NEW_LINE')
        elif token == '}':
            if i < len(tokens_and_types) - 1 and tokens_and_types[i + 1][0] == ';':
                new_tokens += ['CB_COLON', 'NEW_LINE']
                i += 2
                continue
            if i < len(tokens_and_types) - 1 and tokens_and_types[i + 1][0] == ',':
                new_tokens += ['CB_COMA', 'NEW_LINE']
                i += 2
                continue
            new_tokens += ['CB_', 'NEW_LINE']
        elif token == '{':
            new_tokens += ['OB_', 'NEW_LINE']
        elif token == '*/':
            new_tokens += ['*/', 'NEW_LINE']
        elif token == ';':
            new_tokens += [';', 'NEW_LINE']
        else:
            new_tokens.append(token)

        if i < len(tokens_and_types) - 1 and tokens_and_types[i + 1][0] in TOK_NO_SPACE_BEFORE:
            next_token = tokens_and_types[i + 1][0]
            new_tokens[len(new_tokens) - 1] += next_token
            if next_token == ';':
                new_tokens.append('NEW_LINE')
            i += 2
            continue
        i += 1

    lines = re.split('NEW_LINE', ' '.join(new_tokens))

    untok_s = indent_lines(lines)
    untok_s = untok_s.replace('CB_COLON', '};').replace(
        'CB_COMA', '},').replace('CB_', '}').replace('OB_', '{')
    return untok_s



